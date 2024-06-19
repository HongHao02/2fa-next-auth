'use server';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_DEIRECT } from '@/routes';
import { AuthError } from 'next-auth';

import { generateVerificationToken, generateTwoFactorToken } from '@/lib/token';
import { sendVrificationEmail, sendTwoFactorTokenEmail } from '@/lib/mail';
import { getUserByEmail } from '@/data/user';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { db } from '@/lib/db';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';

export const login = async (values: z.infer<typeof LoginSchema>,callbackUrl?: string | null) => {
    console.log(values);
    const validatedValues = LoginSchema.safeParse(values);
    if (!validatedValues.success) {
        return { error: 'Invalid fields' };
    }
    const { email, password, code } = validatedValues.data;

    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: 'Email does not exist!' };
    }
    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);
        await sendVrificationEmail(existingUser.email, verificationToken.token);
        return { success: 'Check your email to confirm login!' };
    }
    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
            if (!twoFactorToken) {
                return { error: 'Invalid code' };
            }
            if (twoFactorToken.token !== code) {
                return { error: 'Your 2FA code does not match!' };
            }
            const hasExpired = new Date(new Date(twoFactorToken.expires)) < new Date();
            if (hasExpired) {
                return { error: 'Token has expired!' };
            }
            await db.twoFactorToken.delete({
                where: { id: twoFactorToken.id },
            });
            const existingConfirmation= await getTwoFactorConfirmationByUserId(existingUser.id)
            if(existingConfirmation){
                await db.twoFactorConfirmation.delete({
                    where: {id: existingConfirmation.id}
                })
            }
            await db.twoFactorConfirmation.create({
                data:{
                    userId: existingUser.id
                }
            })
        } else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email);
            await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token);

            return { twoFactor: true };
        }
    }

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_DEIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            console.log('error ',error);
            
            switch (error.type) {
                case 'CallbackRouteError':
                    return { error: 'Invalid Credentials!' };

                default:
                    return { error: 'Some thing went wrong or Error with verified email!' };
            }
        }
        throw error;
    }

    return { success: 'Send email successfully' };
};
