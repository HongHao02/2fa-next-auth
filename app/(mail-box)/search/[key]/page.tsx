'use client'
import { useParams } from 'next/navigation'
import { getReceivedEmail } from '@/actions/received-email';
import EmailItem from '@/components/email/email-item';
import HashLoaderCustom from '@/components/hash-loader-custom';
import { SkeletonCard } from '@/components/skeleton-card';
import { Skeleton } from '@/components/ui/skeleton';
import { fakeEmails } from '@/data/placeholder';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { searchEmail } from '@/actions/email';
import SearchItem from '@/components/email/search-item';

const KeyPage = () => {
    const { key } = useParams()
    const { data, error, isLoading } = useQuery({
        queryKey: ['search-emails-key', key as string],
        queryFn: () => searchEmail(key as string),
    });
    console.log("data ", data);


    if (isLoading) return <HashLoaderCustom></HashLoaderCustom>;
    if (error) return <div>Error loading data: {error.message}</div>;
    if (data?.data?.length == 0) {
        return <div className='flex justify-center items-center h-full bg-slate-100 rounded-md'>
            Not found for <span className='font-semibold ml-2 '>{key}</span>
        </div>
    }
    return (
        <div className="w-full h-full">
            <div className="p-2">
                {data?.data && data?.data.map((email, index) => (
                    <SearchItem key={index} email={email} type='search' searchKey={key as string}></SearchItem>
                ))}
            </div>
        </div>
    );
}

export default KeyPage
