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
import { Button } from '../ui/button';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import Link from 'next/link';
import { PATH_URL } from '@/constants';
import { Divider } from '@mui/material';

const UserButton = () => {
    const user = useCurrentUser();
    const status = useCurrentStatus();
    const router = useRouter();
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        }
    }, [router, status]);
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
            <DropdownMenuContent className="w-40 space-y-1" align="end">
                <Link href={PATH_URL.SETTNG} >
                    <DropdownMenuItem>
                        <SettingsSuggestIcon></SettingsSuggestIcon>
                        Settings
                    </DropdownMenuItem>
                </Link>
                <Divider></Divider>
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
