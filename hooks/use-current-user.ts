import { useSession } from 'next-auth/react';

/**
 * Custom hook for get user session
 * @returns Current user session
 */
export const useCurrentUser = () => {
    const session = useSession();

    return session.data?.user;
};
