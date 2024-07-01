// 'use client'
// import { getReceivedEmail, getToltalPages } from '@/actions/received-email';
// import EmailItem from '@/components/email/email-item';
// import Pagination from '@/components/email/pagination';
// import HashLoaderCustom from '@/components/hash-loader-custom';
// import NoData from '@/components/no-data';
// import { PAGE_SIZE } from '@/constants';
// import { useQuery } from '@tanstack/react-query';
// import { useSearchParams } from 'next/navigation';
// import React, { useEffect, useState } from 'react';

// const MailBoxLayout = ({ children, searchParams }: {
//     children: React.ReactNode, searchParams?: {
//         query?: string;
//         page?: string;
//     }
// }) => {
//     const sParams = useSearchParams()
//     const currentPage = Number(sParams.get('page')) || 1;

//     console.log("{[searchParams] ", sParams.get('page'));

//     const [totalPage, setTotalPages] = useState<number>(0)
//     console.log("[totalPages] ", totalPage);

//     useEffect(() => {
//         const totalPages = async () => {
//             const ttRPages = await getToltalPages()
//             if (ttRPages) {
//                 setTotalPages(Math.ceil(ttRPages as number / PAGE_SIZE))
//             }
//         }
//         totalPages()
//     }, [currentPage])

//     const { data, error, isLoading } = useQuery({
//         queryKey: ['receivedEmails', currentPage],
//         queryFn: () => getReceivedEmail(currentPage),
//     });
//     console.log("data ", data);

//     if (isLoading) return <HashLoaderCustom></HashLoaderCustom>;
//     if (error) return <div>Error loading data: {error.message}</div>;

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-3 h-full w-full gap-2 ">
//             <div className="p-2">
//                 <div>
//                     {data?.data?.length == 0 ? <NoData>No emails to show</NoData> : data?.data?.map((email, index) => (
//                         <EmailItem key={index} email={email}></EmailItem>
//                     ))}
//                 </div>
//                 <div className='flex justify-center items-center mt-6'>
//                     <Pagination totalPages={totalPage}></Pagination>
//                 </div>
//             </div>
//             <div className=" hidden md:block col-span-2 bg-slate-100  p-2 rounded-lg">{children}</div>
//         </div>
//     );
// };

// export default MailBoxLayout;

import React, { Suspense } from 'react';
import MailBoxLayoutComponent from './_components/mail-box-layout-component';
import { Skeleton } from '@/components/ui/skeleton';

const MailBoxLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 h-full w-full gap-2 ">
            <Suspense fallback={<Skeleton className="w-full h-full"></Skeleton>}>
                <MailBoxLayoutComponent></MailBoxLayoutComponent>
            </Suspense>
            <div className=" hidden md:block col-span-2 bg-slate-100  p-2 rounded-lg">{children}</div>
        </div>
    );
};

export default MailBoxLayout;
