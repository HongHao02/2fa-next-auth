import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { db } from './lib/db';

import authConfig from './auth.config';
import { getUserById } from './data/user';
import { UserRole } from './lib/definitons';
import { getTwoFactorConfirmationByUserId } from './data/two-factor-confirmation';
import { getAccountByUserId } from './data/account';

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig,
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        },
    },
    callbacks: {
        async signIn({ user, account }) {
            console.log('[*auth.ts*-->signIn_user]', user);
            console.log('[*auth.ts*-->signIn_account]', account);
            //Allow OAuth without email verification
            if (account?.type !== 'credentials') {
                return true;
            }
            const existingUser = await getUserById(user?.id || '');
            //Prevent sign in without email verification
            if (!existingUser || !existingUser.emailVerified) {
                return false;
            }
            //Add 2FA check
            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
                if (!twoFactorConfirmation) {
                    return false;
                }
                //Delete two factor confirmation for the next login
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: twoFactorConfirmation.id,
                    },
                });
            }

            return true;
        },
        async session({ token, session }) {
            // console.log({ sessionToken: token });
            if (session.user) {
                if (token.sub) {
                    session.user.id = token.sub;
                }
                session.user.role = token.role;
                if (token.customField) {
                    session.user.customField = token.customField;
                }
                session.user.emailVerified = session.expires;
                session.user.isTwoFactorEnable = token.isTwoFactorEnable;
                session.user.name = token.name;
                session.user.email = token.email as string;
                session.user.isOAuth = token.isOAuth;
            }
            // console.log({ sessionToken_v2: session });
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub);
            if (!existingUser) {
                return token;
            }
            const existingAccount = await getAccountByUserId(existingUser.id);
            token.isOAuth = !!existingAccount;
            token.customField = 'anything_you_want';
            token.role = (existingUser.role as UserRole) || UserRole.USER;
            token.isTwoFactorEnable = existingUser.isTwoFactorEnabled;
            token.email = existingUser.email;
            token.name = existingUser.name;
            token.picture = existingUser.image;

            return token;
        },
    },
});
