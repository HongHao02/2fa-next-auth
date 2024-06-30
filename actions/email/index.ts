'use server';

import { currentUser } from '@/lib/auth';
import { getUserById } from '@/data/user';

import { PAGE_NUMBER_DEFAULT, PAGE_SIZE } from '@/constants';
import { searchEmailByKey } from '@/data/email/search';
import { moveToTrash } from '@/data/email/move-to-trash';
import { getTrashMailsByUserId } from '@/data/email/trash-mail';
import { restoreTrashMailById } from '@/data/email/restore-mail';

export const searchEmail = async (key: string, page: number = PAGE_NUMBER_DEFAULT, pageSize: number = PAGE_SIZE) => {
    try {
        const user = await currentUser();
        if (!user) {
            return { error: 'Unauthorized!' };
        }
        const dbUser = await getUserById(user?.id as string);
        if (!dbUser) {
            return { error: 'Unauthorized! User does not exist in database' };
        }
        const searchEmails = await searchEmailByKey(key, dbUser.id, page, pageSize);
        return { data: searchEmails };
    } catch (error) {
        throw error;
    }
};

// export const trashMail = async (emailId: number) => {
//     try {
//         const user = await currentUser();
//         if (!user) {
//             return { error: 'Unauthorized!' };
//         }
//         const dbUser = await getUserById(user?.id as string);
//         if (!dbUser) {
//             return { error: 'Unauthorized! User does not exist in database' };
//         }
//         if (!emailId) {
//             return { error: 'Invalid emailId' };
//         }
//         const trashEmail = await moveToTrash(dbUser.id, emailId);
//         return trashEmail;
//     } catch (error) {
//         throw error;
//     }
// };
// trashMail.ts
/**
 * [usage] Move email to trash
 * @param emailId
 * @returns email trashed
 */
export const trashMail = async (emailId: number) => {
    try {
        const user = await currentUser();
        if (!user) {
            return { error: 'Unauthorized!' };
        }
        const dbUser = await getUserById(user?.id as string);
        if (!dbUser) {
            return { error: 'Unauthorized! User does not exist in database' };
        }
        if (!emailId) {
            return { error: 'Invalid emailId' };
        }
        const trashEmail = await moveToTrash(dbUser.id, emailId);
        return trashEmail;
    } catch (error) {
        throw error;
    }
};

export const getTrashMail = async () => {
    try {
        const user = await currentUser();
        if (!user) {
            return { error: 'Unauthorized!' };
        }
        const dbUser = await getUserById(user?.id as string);
        if (!dbUser) {
            return { error: 'Unauthorized! User does not exist in database' };
        }

        const trashEmails = await getTrashMailsByUserId(dbUser.id);
        return {
            data: trashEmails,
        };
    } catch (error) {
        throw error;
    }
};

export const restoreTrashMail = async (trashInfo: { emailId: number; trashId: number }) => {
    try {
        if (!trashInfo.emailId || !trashInfo.trashId) {
            return { error: 'Invalid emailId or trashId' };
        }
        const restoreTM = await restoreTrashMailById(trashInfo.emailId, trashInfo.trashId);
        return restoreTM;
    } catch (error) {
        throw error;
    }
};
