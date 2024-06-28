'use server';
import { getSendEmailByUserId } from '@/data/send-email';
import { currentUser } from '@/lib/auth';
import { getUserById } from '@/data/user';
import { PAGE_NUMBER_DEFAULT, PAGE_SIZE } from '@/constants';
export const getSendEmail = async (page: number = PAGE_NUMBER_DEFAULT, pageSize: number = PAGE_SIZE) => {
    try {
        //check user auth
        const user = await currentUser();
        if (!user) {
            return { error: 'Unauthorized!' };
        }
        const dbUser = await getUserById(user?.id as string);
        if (!dbUser) {
            return { error: 'Unauthorized! User does not exist in database' };
        }
        //get received email
        const emails = await getSendEmailByUserId(dbUser.id, page, pageSize);
        return { data: emails };
    } catch (error) {
        throw error;
    }
};
