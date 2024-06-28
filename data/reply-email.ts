import { db } from '@/lib/db';

export const replyEmail = async (userId: string, emailId: number, body: string) => {
    try {
        const sendEmail = await db.reply.create({
            data: {
                body: body,
                sender: { connect: { id: userId } },
                email: {
                    connect: {
                        id: emailId,
                    },
                },
            },
        });
        return sendEmail;
    } catch (error) {
        return null;
    }
};
