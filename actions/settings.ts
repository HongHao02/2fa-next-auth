'use server';
import { unstable_update } from '@/auth';

import { getUserByEmail, getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { sendVrificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/token';
import { SettingsSchema } from '@/schemas';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { UserRole } from '@/lib/definitons';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
    const user = await currentUser();
    if (!user) {
        return { error: 'Unauthorized!' };
    }
    const dbUser = await getUserById(user?.id as string);
    if (!dbUser) {
        return { error: 'Unauthorized! User does not exist in database' };
    }
    if (user.isOAuth) {
        //These fields are managed by OAuth not Credentials
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }
    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email);
        if (existingUser && existingUser.id !== user.id) {
            return { error: 'Email already in use by another account!' };
        }
        const verificationToken = await generateVerificationToken(values.email);
        await sendVrificationEmail(verificationToken.email, verificationToken.token);
        return { success: 'Verification email sent! Check it now.' };
    }
    if (values.password && values.newPassword && dbUser.password) {
        const passwordMatch = await bcrypt.compare(values.password, dbUser.password);
        if (!passwordMatch) {
            return { error: 'Incorrect password!' };
        }
        const hashPassword = await bcrypt.hash(values.newPassword, 10);
        values.password = hashPassword;
        values.newPassword = undefined; //do nothing with newPassword
    }
    const updateUser = await db.user.update({
        where: { id: user.id },
        data: {
            ...values,
        },
    });
    unstable_update({
        user: {
            name: updateUser.name,
            email: updateUser.email,
            isTwoFactorEnable: updateUser.isTwoFactorEnabled,
            role: updateUser.role as UserRole,
        },
    });
    return { success: 'Update successfully' };
};
