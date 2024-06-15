'use server';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_DEIRECT } from '@/routes';
import { AuthError } from 'next-auth';
export const login = async (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
    const validatedValues = LoginSchema.safeParse(values);
    if (!validatedValues.success) {
        return { error: 'Invalid fields' };
    }
    const { email, password } = validatedValues.data;
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
                    return { error: 'Some thing went wrong or Error with verified email!'};
            }
        }
        throw error;
    }

    return { success: 'Send email successfully' };
};
