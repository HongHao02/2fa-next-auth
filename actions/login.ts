'use server';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_DEIRECT } from '@/routes';
import { AuthError } from 'next-auth';

import { generateVerificationToken, generateTwoFactorToken } from '@/lib/token';
import { sendVrificationEmail, sendTwoFactorTokenEmail } from '@/lib/mail';
import { getUserByEmail } from '@/data/user';

export const login = async (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
    const validatedValues = LoginSchema.safeParse(values);
    if (!validatedValues.success) {
        return { error: 'Invalid fields' };
    }
    const { email, password } = validatedValues.data;

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
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);
        await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token);

        return {twoFactor: true}
    }

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_DEIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid Credentials!' };

                default:
                    return { error: 'Some thing went wrong or Error with verified email!' };
            }
        }
        throw error;
    }

    return { success: 'Send email successfully' };
};
