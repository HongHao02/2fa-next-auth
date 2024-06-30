import { PAGE_NUMBER_DEFAULT, PAGE_SIZE } from '@/constants';
import { db } from '@/lib/db';

export const searchEmailByKey = async (
    key: string,
    userId: string,
    page: number = PAGE_NUMBER_DEFAULT,
    pageSize: number = PAGE_SIZE,
) => {
    try {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const emails = await db.email.findMany({
            where: {
                isTrash: false,
                recipients: {
                    some: {
                        recipientId: userId,
                    },
                },
                OR: [
                    {
                        subject: {
                            contains: key,
                            mode: 'insensitive',
                        },
                    },
                    {
                        body: {
                            contains: key,
                            mode: 'insensitive',
                        },
                    },
                    {
                        sender: {
                            name: {
                                contains: key,
                                mode: 'insensitive',
                            },
                        },
                    },
                ],
            },
            select: {
                id: true,
                subject: true,
                body: true,
                sentAt: true,
                sender: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                sentAt: 'desc',
            },
            skip: skip,
            take: take,
        });
        return emails;
    } catch (error) {
        return null;
    }
};
