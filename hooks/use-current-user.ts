'use client';
import { useSession } from 'next-auth/react';

/**
 * Custom hook for get user session
 * @returns Current user session
 */
export const useCurrentUser = () => {
    const session = useSession();
    const refetchSession = async () => {
        await session.update();
    };
    // refetchSession();
    console.log('useCurrentSession ', session);

    return session.data?.user;
};
