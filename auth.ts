import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { db } from './lib/db';

import authConfig from './auth.config';
import { getUserById } from './data/user';
import { UserRole } from './lib/definitons';
import { getTwoFactorConfirmationByUserId } from './data/two-factor-confirmation';

export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
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
            console.log({ sessionToken: token });
            if (token.sub && session.user) {
                session.user.customField = token.customField as string;
                session.user.id = token.sub;
                session.user.role = token.role as UserRole;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub);
            console.log({ token, user });
            if (user && existingUser) {
                token.customField = 'anything_you_want';
                token.role = user.role || UserRole.USER;
            }
            return token;
        },
    },
});
