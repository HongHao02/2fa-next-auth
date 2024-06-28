import { PAGE_SIZE } from '@/constants';
import { db } from '@/lib/db';

export const getReceivedEmailByUserId = async (userId: string, page: number, pageSize: number = PAGE_SIZE) => {
    try {
        const skip = (page - 1) * pageSize
        const take = pageSize;

        const emails = await db.recipient.findMany({
            where: {
                recipientId: userId,
            },
            select: {
                email: {
                    select: {
                        id: true,
                        subject: true,
                        sentAt: true,
                        sender: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            },
                        },
                    },
                },
            },
            orderBy: {
                email: {
                    sentAt: 'desc',
                },
            },
            skip: skip,
            take: take,
        });

        return emails;
    } catch (error) {
        return null;
    }
};
