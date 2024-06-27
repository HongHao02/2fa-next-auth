'use server';

import { ResponseBase, User } from '@/types/base.type';

export const fetchUser = async (): Promise<ResponseBase<User[]>> => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data: User[] = await response.json(); // Chuyển đổi phản hồi sang JSON
        console.log('data ', data);
        
        
        console.log('[fetchUser_data] ', data);
        return {
            statusCode: 200,
            message: 'Get user list successfully.',
            data: data,
        };
    } catch (error) {
        console.log('[fetchUser_error] ', error);
        throw error;
    }
};

export const test = async () => {
    return {
        name: 'HongHao',
        age: 24,
    };
};
