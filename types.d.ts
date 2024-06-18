import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { UserRole } from './lib/definitons';
import { DateTime } from 'next-auth/providers/kakao';

declare module 'next-auth' {
    interface Session {
        user: {
            customField?: string; //Add custom field
            role?: UserRole; //Add role field for user
            emailVerified: DateTime;
            isTowFactorEnable: boolean;
        } & DefaultSession['user'];
    }

    interface User {
        customField?: string; //Add custom field to interface User
        role?: UserRole; //Add role field for user,
        name: string | null;
        emailVerified: DateTime;
        isTowFactorEnable: boolean;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        customField?: string;
        role?: UserRole;
        isTowFactorEnable: boolean;
    }
}
