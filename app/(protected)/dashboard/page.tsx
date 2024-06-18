import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const DashboardPage = () => {
    return (
        <div className=' gap-x-2'>
            Dashboard Page
            <Button asChild><Link href={'/setting'}>Setting</Link></Button>
        </div>
    )
}

export default DashboardPage
