'use server';

import { PAGE_NUMBER_DEFAULT, PAGE_SIZE } from '@/constants';
import { searchEmailByKey } from '@/data/email/search';

export const searchEmail = async (key: string, page: number = PAGE_NUMBER_DEFAULT, pageSize: number = PAGE_SIZE) => {
    try {
        const searchEmails = await searchEmailByKey(key, page, pageSize);
        return searchEmails;
    } catch (error) {
        throw error;
    }
};
