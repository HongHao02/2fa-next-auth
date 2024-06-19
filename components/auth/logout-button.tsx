'use client';
import React from 'react';

import { logout } from '@/actions/logout';
import { useRouter } from 'next/navigation';

interface LogoutButtonProps {
    children?: React.ReactNode;
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
    const router = useRouter();
    const onClick = () => {
        logout();
        router.push('/');
    };
    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
};

export default LogoutButton;
