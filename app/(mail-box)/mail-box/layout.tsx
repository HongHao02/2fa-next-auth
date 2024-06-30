'use client'
import { getReceivedEmail } from '@/actions/received-email';
import EmailItem from '@/components/email/email-item';
import HashLoaderCustom from '@/components/hash-loader-custom';
import NoData from '@/components/no-data';
import { useQuery } from '@tanstack/react-query';
import { Metadata } from 'next';
import React from 'react';



const MailBoxLayout = ({ children }: { children: React.ReactNode }) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['receivedEmails'],
        queryFn: () => getReceivedEmail(),
    });
    console.log("data ", data);


    if (isLoading) return <HashLoaderCustom></HashLoaderCustom>;
    if (error) return <div>Error loading data: {error.message}</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 h-full w-full gap-2 ">
            <div className="p-2">
                {data?.data?.length == 0 ? <NoData>No emails to show</NoData> : data?.data?.map((email, index) => (
                    <EmailItem key={index} email={email}></EmailItem>
                ))}
            </div>
            <div className=" hidden md:block col-span-2 bg-slate-100  p-2 rounded-lg">{children}</div>
        </div>
    );
};

export default MailBoxLayout;
