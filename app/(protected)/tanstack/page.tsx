'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUser, test } from '@/actions/tanstack';
import { SkeletonCard } from '@/components/skeleton-card';

const Tanstack = () => {
    // Sử dụng đối tượng tùy chọn với useQuery
    const { data, error, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetchUser(),
    });

    if (isLoading) return <SkeletonCard></SkeletonCard>;
    if (error) return <div>Error loading data: {error.message}</div>;
    console.log('[tanstack] ', data);

    return (
        <div className=" flex flex-col justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                {data?.data?.map((user) => (
                    <div key={user.id} className="rounded-md bg-black p-2 text-white min-w-[300px] space-y-2">
                        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm ">
                            <p className="text-sm font-medium">ID</p>
                            <p className="truncate text-xs max-w-[200px] font-mono p-1 bg-slate-600 rounded-md">
                                {user.id}
                            </p>
                        </div>
                        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm ">
                            <p className="text-sm font-medium">Name</p>
                            <p className="truncate text-xs max-w-[200px] font-mono p-1 bg-slate-600 rounded-md">
                                {user.name}
                            </p>
                        </div>
                    </div> // Hiển thị tên người dùng
                ))}
            </div>
        </div>
    );
};

export default Tanstack;
