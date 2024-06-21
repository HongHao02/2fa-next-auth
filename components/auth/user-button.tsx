'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { IoMdLogOut } from 'react-icons/io';

import React, { useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { useCurrentUser } from '@/hooks/use-current-user';
import LogoutButton from './logout-button';
import { useCurrentStatus } from '@/hooks/use-current-status';
import { useRouter } from 'next/navigation';

const UserButton = () => {
    const user = useCurrentUser();
    const status = useCurrentStatus();
    const router = useRouter();
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        }
    }, [status]);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ''}></AvatarImage>
                    <AvatarFallback className="bg-sky-400">
                        <FaUser className="text-white"></FaUser>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                <LogoutButton>
                    <DropdownMenuItem>
                        <IoMdLogOut className="h-5 w-5 mr-2"></IoMdLogOut>Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserButton;
