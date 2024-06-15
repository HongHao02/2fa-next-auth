import React from 'react'
import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const SettingPage = async () => {
    const session = await auth()
    return (
        <div className='flex flex-col justify-center items-center p-2 h-full gap-y-2'>
            <p className='font-semibold text-3xl text-green-400'>USER SESSION</p>
            <div className='max-w-[600px] text-wrap rounded-sm bg-slate-400 p-2 shadow-md'>
                {JSON.stringify(session)}
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
