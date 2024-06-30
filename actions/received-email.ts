'use server';
import { getReceivedEmailByUserId, getTotalReceivedEmailsByUserId } from '@/data/received-email';
import { currentUser } from '@/lib/auth';
import { getUserByEmail, getUserById } from '@/data/user';
import { PAGE_NUMBER_DEFAULT, PAGE_SIZE } from '@/constants';
export const getReceivedEmail = async (page: number = PAGE_NUMBER_DEFAULT, pageSize: number = PAGE_SIZE) => {
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
        const emails = await getReceivedEmailByUserId(dbUser.id, page, pageSize);
        return { data: emails };
    } catch (error) {
        throw error;
    }
};

export const getToltalPages = async () => {
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
        const totalPages = await getTotalReceivedEmailsByUserId(dbUser.id);
        return totalPages;
    } catch (error) {
        throw error;
    }
};
