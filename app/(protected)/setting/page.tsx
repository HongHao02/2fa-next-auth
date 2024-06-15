import React from 'react'
import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


const SettingPage = async () => {
    const session = await auth()
    const sessionObj = JSON.stringify(session)

    const renderSessionItem = (label: string, item: any) => (
        <div className='flex p-2 min-w-[500px] bg-slate-400'><span className='font-semibold text-xl mr-2 w-[100px]'>{label}:</span><span className='flex-1 text-center'>{item}</span></div>
    )
    return (
        <div className='flex flex-col justify-center items-center p-2 h-full gap-y-2'>
            <p className='font-semibold text-3xl text-green-400'>USER SESSION</p>
            <div className='max-w-[600px] flex flex-col gap-y-2 rounded-sm bg-slate-400 p-2 shadow-md'>
                {renderSessionItem('id', session?.user.id)}
                {renderSessionItem('ROLE', session?.user.role)}
                {renderSessionItem('name', session?.user.name)}
                {renderSessionItem('email', session?.user.email)}
                {renderSessionItem('image', session?.user.image)}
                {renderSessionItem('expires', session?.expires)}
                {renderSessionItem('customField', session?.user.customField)}
            </div>
            <form action={async () => {
                'use server'
                await signOut({ redirectTo: '/auth/login' })
            }}>
                <Button type='submit'>Sign out</Button>
            </form>
            <div >
                <Button><Link href={'/dashboard'}>Dashboard</Link></Button>
            </div>
        </div>
    )
}

export default SettingPage
