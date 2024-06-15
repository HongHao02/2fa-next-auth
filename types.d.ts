import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { UserRole } from './lib/definitons';

declare module 'next-auth' {
    interface Session {
        user: {
            customField?: string; //Add custom field
            role?: UserRole; //Add role field for user
        } & DefaultSession['user'];
    }

    interface User {
        customField?: string; //Add custom field to interface User
        role?: UserRole; //Add role field for user
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        customField?: string; 
        role?: UserRole;
    }
}
