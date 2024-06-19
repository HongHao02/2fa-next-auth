import React from 'react'

import { poppins } from '../fonts'
import { cn } from '@/lib/utils'

interface HeaderProps{
    label: string
}
const Header = ({label}:HeaderProps) => {
  return (
    <div className='w-full flex justify-center items-center flex-col gap-y-4'>
        <h1 className={cn("text-3xl font-semibold", poppins.className)}>🔐Auth</h1>
        <p className='text-muted-foreground text-sm'>{label}</p>
    </div>
  )
}

export default Header
