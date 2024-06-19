'use client';
import React from 'react';
import { usePathname } from 'next/navigation';


import ActiveButton from './active-button';
import UserButton from '@/components/auth/user-button';
const navbar = [
    { active: '/server', href: '/server', label: 'Server' },
    { active: '/client', href: '/client', label: 'Client' },
    { active: '/dashboard', href: '/dashboard', label: 'Dashboard' },
    { active: '/admin', href: '/admin', label: 'Admin' },
    { active: '/setting', href: '/setting', label: 'Setting' },
];
const NavBar = () => {
    const pathName = usePathname();
    return (
        <nav className="bg-slate-200 flex justify-between items-center p-4 rounded-xl w-[800px] h-[60px] shadow-sm">
            <div className="flex gap-x-2">
                {navbar.map((nav, index) => (
                    <ActiveButton
                        key={index}
                        active={nav.active}
                        pathName={pathName}
                        href={nav.href}
                        label={nav.label}
                    ></ActiveButton>
                ))}
            </div>
            <UserButton></UserButton>
        </nav>
    );
};

export default NavBar;
