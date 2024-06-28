import { PAGE_NUMBER_DEFAULT, PAGE_SIZE } from '@/constants';
import { db } from '@/lib/db';

export const getSendEmailByUserId = async (userId: string, page: number = PAGE_NUMBER_DEFAULT, pageSize: number = PAGE_SIZE) => {
    try {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const emails = await db.email.findMany({
            where: {
              senderId: userId,
            },
            select: {
              id: true,
              subject: true,
              sentAt: true,
              recipients: {
                select: {
                  recipient: {
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
              sentAt: 'desc',
            },
            skip: skip,
            take: take,
          })
        
          return emails
    } catch (error) {
        return null;
    }
};
