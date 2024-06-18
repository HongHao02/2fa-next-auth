'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { logout } from '@/actions/logout';
import { useCurrentUser } from '@/hooks/use-current-user';

const SettingPage = () => {
    const user= useCurrentUser()
    const renderSessionItem = (label: string, item: any) => (
        <div className="flex p-2 min-w-[500px] bg-slate-400">
            <span className="font-semibold text-xl mr-2 w-[100px]">{label}:</span>
            <span className="flex-1 text-center">{item}</span>
        </div>
    );
    return (
        <div className="flex flex-col justify-center items-center p-2 gap-y-2">
            <p className="font-semibold text-3xl text-green-400">USER SESSION using useSession</p>
            <div className="max-w-[600px] flex flex-col gap-y-2 rounded-sm bg-slate-400 p-2 shadow-md">
                <Image
                    alt="avt"
                    src={user?.image || '/no_avt_male.jpg'}
                    width={50}
                    height={50}
                    className="rounded-full"
                ></Image>

                {renderSessionItem('id', user?.id)}
                {renderSessionItem('ROLE', user?.role)}
                {renderSessionItem('name', user?.name)}
                {renderSessionItem('email', user?.email)}
                {renderSessionItem('emailVerified', user?.emailVerified)}
                {renderSessionItem('customField', user?.customField)}
            </div>
            {/* <form action={async () => {
                'use server'
                await signOut({ redirectTo: '/auth/login' })
            }}>
                <Button type='submit'>Sign out</Button>
            </form> */}
        </div>
    );
};

export default SettingPage;
