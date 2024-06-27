import React from 'react'
import Search from './search'
import NotifyMenu from './notify-menu'
import UserButton from './auth/user-button'
import CustomSheet from './sheet'

const Header = () => {
    return (
        <div className='flex justify-between items-center px-2 md:px-4 py-1 bg-sky-600'>
            <div className='flex gap-2 lg:gap-20'>
                <CustomSheet></CustomSheet>
                <h1 className='flex items-center font-semibold text-xl text-white'><span className='text-purple-800'>MAILBOX</span> APP</h1>
                <div className='hidden md:block'>
                    <Search></Search>
                </div>
            </div>
            <div className='flex justify-center gap-2'>
                <NotifyMenu></NotifyMenu>
                <UserButton></UserButton>
            </div>
        </div>
    )
}

export default Header
