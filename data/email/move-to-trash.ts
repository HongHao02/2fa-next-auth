import { db } from '@/lib/db';


export const moveToTrash = async (userId: string, emailId: number) => {
    try {
        const email = await db.email.findUnique({
            where: { id: emailId },
        });

        const user = await db.user.findUnique({
            where: { id: userId },
        });

        if (!email || !user) {
            throw new Error('Email or User do not exist!');
        }
        const updateIsTrash = await db.email.update({
            where: {
                id: emailId,
            },
            data: {
                isTrash: true,
            },
        });

        const trash = await db.trash.create({
            data: {
                emailId: emailId,
                userId: userId,
                previousFolder: ''
            }
        });

        return trash;
    } catch (error) {
        return null;
    }
};
