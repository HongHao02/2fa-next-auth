'use server';

import { currentRole } from '@/lib/auth';
import { UserRole } from '@/lib/definitons';

export const admin = async () => {
    const role = await currentRole();
    if (role === UserRole.ADMIN) {
        return { success: 'OKAY' };
    }
    return { error: 'FORBIDEN' };
};
