'use client';
import { useSession } from 'next-auth/react';

/**
 * Custom hook for get current status of the sesstion
 * @returns Current sesstion's status
 */
export const useCurrentStatus = () => {
    const { status } = useSession();
    console.log('useCurrentSessionStatus ', status);

    return status;
};
