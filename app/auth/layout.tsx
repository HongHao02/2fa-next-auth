import AuthContext from '@/components/auth-context';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthContext>
            <div className="text-white flex justify-center items-center h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-600 to-slate-950">
                {children}
            </div>
        </AuthContext>
    );
};

export default AuthLayout;
