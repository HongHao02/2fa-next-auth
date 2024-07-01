'use client';
import { getToltalPages } from '@/actions/received-email';
import { getSendEmail } from '@/actions/send-email';
import Pagination from '@/components/email/pagination';
import SendEmailItem from '@/components/email/send-email-item';
import HashLoaderCustom from '@/components/hash-loader-custom';
import { PAGE_SIZE } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SendLayoutComponent = () => {
    const sParams = useSearchParams();
    const currentPage = Number(sParams.get('page')) || 1;

    console.log('{[searchParams] ', sParams.get('page'));

    const [totalPage, setTotalPages] = useState<number>(0);
    console.log('[totalPages] ', totalPage);

    useEffect(() => {
        const totalPages = async () => {
            const ttRPages = await getToltalPages();
            if (ttRPages) {
                setTotalPages(Math.ceil((ttRPages as number) / PAGE_SIZE));
            }
        };
        totalPages();
    }, [currentPage]);
    const { data, error, isLoading } = useQuery({
        queryKey: ['sendEmails'],
        queryFn: () => getSendEmail(currentPage),
    });
    console.log('data ', data);

    if (isLoading) return <HashLoaderCustom></HashLoaderCustom>;
    if (error) return <div>Error loading data: {error.message}</div>;
    return (
        <>
            <div className="p-2">
                <div>
                    {data?.data?.map((email, index) => (
                        <SendEmailItem key={index} email={email}></SendEmailItem>
                    ))}
                </div>
                <div className="flex justify-center items-center mt-2">
                    <Pagination totalPages={totalPage}></Pagination>
                </div>
            </div>
        </>
    );
};

export default SendLayoutComponent;
