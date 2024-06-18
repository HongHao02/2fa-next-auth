'use client';
import React from 'react';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
interface ActiveButtonProps {
    label: string;
    href: string;
    active: string;
    pathName: string;
}
const ActiveButton = ({ label, href, active, pathName }: ActiveButtonProps) => {
    return (
        <Button asChild variant={active === pathName ? 'default' : 'outline'} >
            <Link href={href}>{label}</Link>
        </Button>
    );
};

export default ActiveButton;
