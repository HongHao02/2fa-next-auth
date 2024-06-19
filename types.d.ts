import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { UserRole } from '@prisma/client';

declare module 'next-auth' {
    interface Session {
        user: {
            customField?: string; //Add custom field
            role: UserRole; //Add role field for user
            emailVerified: Date | null;
            isTwoFactorEnabled: boolean;
            isOAuth: boolean;
        } & DefaultSession['user'];
    }

    interface User {
        customField?: string; //Add custom field to interface User
        role: UserRole; //Add role field for user,
        name: string | null;
        emailVerified: Date | null;
        isTwoFactorEnabled: boolean;
        isOAuth: boolean;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        customField?: string;
        role: UserRole;
        isTwoFactorEnabled: boolean;
        isOAuth: boolean;
    }
}
