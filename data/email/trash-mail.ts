import { PAGE_NUMBER_DEFAULT, PAGE_SIZE } from '@/constants';
import { db } from '@/lib/db';

export const getTrashMailsByUserId = async (
    userId: string,
    page: number = PAGE_NUMBER_DEFAULT,
    pageSize: number = PAGE_SIZE,
) => {
    try {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const trashMails = await db.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                trash: {
                    select: {
                        id: true,
                        deletedAt: true,
                        previousFolder: true,
                        email: {
                            select: {
                                id: true,
                                subject: true,
                                body: true,
                                sentAt: true,
                                sender: {
                                    select: {
                                        email: true,
                                        name: true,
                                        image: true,
                                        id: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!trashMails) {
            throw new Error('User not found');
        }

        // Sắp xếp mảng trash theo deletedAt giảm dần
        // const sortedTrash = trashMails.trash.sort((a: trashType, b: trashType) => new Date(b.deletedAt) - new Date(a.deletedAt)); //typescript error
        const sortedTrash = trashMails.trash.sort((a, b) => new Date(b.deletedAt).getTime() - new Date(a.deletedAt).getTime());

        // Phân trang kết quả
        const paginatedTrash = sortedTrash.slice(skip, skip + take);

        return paginatedTrash;
    } catch (error) {
        return null;
    }
};
