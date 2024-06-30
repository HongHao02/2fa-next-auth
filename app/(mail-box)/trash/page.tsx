'use client'

import HashLoaderCustom from '@/components/hash-loader-custom';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getTrashMail } from '@/actions/email';
import TrashItem from '@/components/email/trash-item';

const TrashEmailsPage = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['trash-emails'],
        queryFn: () => getTrashMail(),
    });
    console.log("data ", data);


    if (isLoading) return <HashLoaderCustom></HashLoaderCustom>;
    if (error) return <div>Error loading data: {error.message}</div>;
    if (!data) {
        return <div className='flex justify-center items-center h-full bg-slate-100 rounded-md'>
            Yeah! You do not have any trash email.
        </div>
    }
    return (
        <div className="w-full h-full">
            <div className="p-2">
                {data?.data && data?.data.map((trash, index) => (
                    <TrashItem key={index} trash={trash} ></TrashItem>
                ))}
            </div>
        </div>
    );
}

export default TrashEmailsPage
