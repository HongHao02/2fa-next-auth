import { db } from '@/lib/db';

export const restoreTrashMailById = async (emailId: number, trashId: number) => {
    try {
        const email = await db.email.findUnique({
            where: { id: emailId },
        });

        const trashEmail = await db.trash.findUnique({
            where: { id: trashId },
        });

        if (!email || !trashEmail) {
            throw new Error('Email or trashEmail do not exist!');
        }
        const updateIsTrash = await db.email.update({
            where: {
                id: emailId,
            },
            data: {
                isTrash: false,
            },
        });

        const deletedTrashEmail = await db.trash.delete({
            where: {
                id: trashId,
            },
        });

        return deletedTrashEmail;
    } catch (error) {
        return null;
    }
};
