'use client'
import AuthContext from '@/components/auth-context'
import LogoutButton from '@/components/auth/logout-button'
import Feature from '@/components/feature'
import Header from '@/components/header'
import LeftSideBar from '@/components/left-side-bar'
import SidebarCustom from '@/components/SidebarCustom'
import { Divider, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { AlertDialogCustom } from '@/components/alert-dialog-custom'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

interface MailBoxGroupLayoutProps {
    children: React.ReactNode
}
const MailBoxGroupLayout = ({ children }: MailBoxGroupLayoutProps) => {
    const pathname = usePathname()
    const onSignout = async () => {
        await signOut({ callbackUrl: pathname });
        // router.push(pathname);
    };
    return (
        <AuthContext>
            <div className="flex flex-col gap-1 overflow-x-hidden min-h-screen">
                <Header></Header>
                <div className="flex bg-white  flex-1 mb-2">
                    <div className="flex flex-col  items-center justify-between w-14 p-2 gap-y-1 bg-white shadow-md">
                        <div>
                            <LeftSideBar></LeftSideBar>
                        </div>
                        <div className='flex flex-col justify-end px-2'>
                            <div className='w-full h-[1px] bg-slate-300 mb-2'></div>
                            <AlertDialogCustom message='When you logout. You will be redirected to the login page.' action={onSignout}>
                                <Tooltip placement='right' title="Logout"><LogoutIcon className='w-6 h-6'></LogoutIcon></Tooltip>
                            </AlertDialogCustom>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-2 px-2 min-h-[570px]">
                        <div className="h-11 rounded-md p-1 flex gap-2">
                            <Button variant={'outline'} disabled>Next Feature</Button>
                            <Button variant={'outline'} disabled>Next Feature</Button>
                            <Button variant={'outline'} disabled>Next Feature</Button>
                            <Button variant={'outline'} disabled>Next Feature</Button>
                            <Button variant={'outline'} disabled>Next Feature</Button>
                        </div>
                        <div className="flex items-center bg-slate-300 shadow-md rounded-md px-2 py-4 h-12 ">
                            <Feature></Feature>
                        </div>
                        <div className="flex flex-1 ">
                            <div className="w-2/12 hidden lg:block p-2 rounded-md">
                                <SidebarCustom></SidebarCustom>
                            </div>
                            <div className="w-full lg:w-10/12 bg-white p-2">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthContext>
    )
}

export default MailBoxGroupLayout
