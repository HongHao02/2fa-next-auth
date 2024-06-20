'use client';
import React from 'react';
import { signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

interface LogoutButtonProps {
    children?: React.ReactNode;
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const onClick = () => {
        signOut({ redirect: true, callbackUrl: pathname });
        router.push(pathname);
    };
    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
};

export default LogoutButton;
