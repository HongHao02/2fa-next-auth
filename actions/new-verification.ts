'use server';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { getVerificationTokenByToken } from '@/data/verification-token';

export const newVerificationToken = async (token: string) => {
    console.log("[server-action_verified] ",token);
    
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return { error: 'Token does not exist!' };
    }
    const hasExpired = new Date(existingToken.expires) < new Date();

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: 'Email does not exist!' };
    }
    if(hasExpired){
        return {error: "Token has expired!"}
    }
    await db.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            emailVerified: new Date(),
            email: existingUser.email, //resuse for changing email
        },
    });

    await db.verificationToken.delete({
        where: {
            id: existingToken.id,
        },
    });
    return { success: 'Email verified! You can login now' };
};
