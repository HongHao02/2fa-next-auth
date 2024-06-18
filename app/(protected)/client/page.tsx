'use client'
import React from 'react';
import UserInfo from '@/components/user-info';
import { useCurrentUser } from '@/hooks/use-current-user';

const ClientPage  = () => {
    const user = useCurrentUser()
    const renderSessionItem = (label: string, item: any) => (
        <div className="flex p-2 min-w-[500px] bg-slate-400">
            <span className="font-semibold text-xl mr-2 w-[100px]">{label}:</span>
            <span className="flex-1 text-center">{item}</span>
        </div>
    );
    return (
        <UserInfo user={user} label='👥 Client component'></UserInfo>
    );
};

export default ClientPage;
