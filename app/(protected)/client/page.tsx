'use client'
import React from 'react';
import UserInfo from '@/components/user-info';
import { useCurrentUser } from '@/hooks/use-current-user';

const ClientPage  = () => {
    const user = useCurrentUser()
    console.log('user ',user);
    
    return (
        <UserInfo user={user} label='👥 Client component'></UserInfo>
    );
};

export default ClientPage;
