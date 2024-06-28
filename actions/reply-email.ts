'use server';
import * as z from 'zod';
import { ReplyEmailSchema } from '@/schemas';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/auth';
import { getUserByEmail, getUserById } from '@/data/user';
import { replyEmail } from '@/data/reply-email';

export const reply = async (values: z.infer<typeof ReplyEmailSchema>, emailId: number) => {
    try {
        //validate data
        const validatedFields = ReplyEmailSchema.safeParse(values);
        if (!validatedFields.success) {
            return { error: 'Invalid values' };
        }
        const { body } = validatedFields.data;
        if (!emailId) {
            return { error: 'Invalid emailId' };
        }
        const existingEmail = await db.email.findUnique({
            where: {
                id: emailId,
            },
        });
        if (!existingEmail) {
            return { error: 'Email does not exist!' };
        }
        //check user auth
        const user = await currentUser();
        if (!user) {
            return { error: 'Unauthorized!' };
        }
        const dbUser = await getUserById(user?.id as string);
        if (!dbUser) {
            return { error: 'Unauthorized! User does not exist in database' };
        }
        //reply email

        const rEmail = await replyEmail(dbUser.id, emailId, body);
        return { success: 'Reply email successfully!' };
    } catch (error) {
        throw error;
    }
};
