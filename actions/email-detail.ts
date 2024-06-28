'use server';
import { getEmailDetailById } from '@/data/email-details';

export const getEmailDetails = async (emailId: number) => {
    try {
        const email = await getEmailDetailById(emailId);
        return { email };
    } catch (error) {
        throw error;
    }
};
