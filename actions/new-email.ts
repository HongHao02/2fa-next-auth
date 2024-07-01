'use server';
import * as z from 'zod';
import { NewEmailSchema } from '@/schemas';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/auth';
import { getUserByEmail, getUserById } from '@/data/user';

export const newEmail = async (values: z.infer<typeof NewEmailSchema>) => {
    try {
        //validate data
        const validatedFields = NewEmailSchema.safeParse(values);
        if (!validatedFields.success) {
            return { error: 'Invalid values' };
        }
        const { to, subject, content } = validatedFields.data;
        //check user auth
        const user = await currentUser();
        if (!user) {
            return { error: 'Unauthorized!' };
        }
        const dbUser = await getUserById(user?.id as string);
        if (!dbUser) {
            return { error: 'Unauthorized! User does not exist in database' };
        }
        //find receiver email
        const existingEmail = await getUserByEmail(to);
        console.log("[existingEmail] ", existingEmail?.email, existingEmail?.name, !existingEmail);
        
        if (!existingEmail) {
            return { error: 'Receiver email does not exist!' };
        }
        //send email
        const sendEmail = await db.email.create({
            data: {
                sender: { connect: { id: dbUser.id } },
                subject: subject,
                body: content,
                recipients: {
                    create: [{ recipient: { connect: { id: existingEmail.id } } }],
                },
            },
        });
        return { success: 'Send email successfully!' };
    } catch (error) {
        throw error;
    }
};
