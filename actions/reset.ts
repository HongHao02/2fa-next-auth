'use server';

import * as z from 'zod';

import { ResetSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePassowrdResetToken } from '@/lib/token';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: 'Invalid email' };
    }
    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: 'Email not found!' };
    }

    //TODO: Generate token and send email
    const passowrdResetToken = await generatePassowrdResetToken(email);
    await sendPasswordResetEmail(passowrdResetToken.email, passowrdResetToken.token);

    return { success: 'Reset email send!' };
};
