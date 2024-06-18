import React from 'react';
import Image from 'next/image';
import { currentUser } from '@/lib/auth';
import UserInfo from '@/components/user-info';

const ServerPage = async () => {
    const user = await currentUser();
    const renderSessionItem = (label: string, item: any) => (
        <div className="flex p-2 min-w-[500px] bg-slate-400">
            <span className="font-semibold text-xl mr-2 w-[100px]">{label}:</span>
            <span className="flex-1 text-center">{item}</span>
        </div>
    );
    return (
        <UserInfo user={user} label='💻 Server component'></UserInfo>
    );
};

export default ServerPage;
