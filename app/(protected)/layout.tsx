import React from 'react';

import NavBar from './_components/navbar';
import AuthContext from '@/components/auth-context';

interface ProtectedLayoutProps {
    children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <AuthContext>
            <div className="h-full w-full flex flex-col justify-center items-center gap-y-10 bg-white">
                <NavBar></NavBar>
                {children}
            </div>
        </AuthContext>
    );
};

export default ProtectedLayout;
