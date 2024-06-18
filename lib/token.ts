import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

import { getVerificationTokenByEmail } from '@/data/verification-token';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';
import { db } from './db';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
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

//TwoFactorToken
export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    //expire after 5 minutes
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

    const existingToken = await getTwoFactorTokenByEmail(email);
    if (existingToken) {
        await db.twoFactorToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }
    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            expires,
            token,
        },
    });
    return twoFactorToken;
};
