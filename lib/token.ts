import { v4 as uuidv4 } from 'uuid';

import { getVerificationTokenByEmail } from '@/data/verification-token';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';
import { db } from './db';
export const generatePassowrdResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000); //expire in 1 hour

    const existingToken = await getPasswordResetTokenByEmail(email);
    if (existingToken) {
        await db.passwordResetToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }
    const passowrdResetToken = await db.passwordResetToken.create({
        data: {
            email: email,
            token: token,
            expires: expires,
        },
    });
    return passowrdResetToken;
};

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000); //expire in 1 hour

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }
    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    });
    return verificationToken;
};
