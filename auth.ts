import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { db } from './lib/db';

import authConfig from './auth.config';
import { getUserById } from './data/user';
import { UserRole } from './lib/definitons';

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
        async signIn({ user }) {
            if (user) {
                console.log('[*auth.ts*-->signIn_user]', user);
                if(user.id){
                    return true;
                }
                const existingUser = await getUserById(user?.id || '');
                //not allow user to login if they do not have emailVerified
                if (!existingUser || !existingUser.emailVerified) {
                    return false;
                }
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
