import React from 'react';

import NavBar from './_components/navbar';

interface ProtectedLayoutProps {
    children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center gap-y-10 bg-white">
            <NavBar></NavBar>
            {children}
        </div>
    );
};

export default ProtectedLayout;
