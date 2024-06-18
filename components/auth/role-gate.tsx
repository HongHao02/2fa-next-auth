'use client';
import { userCurrentRole } from '@/hooks/use-current-role';
import { UserRole } from '@/lib/definitons';
import React from 'react';
import FormError from '../form-error';

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole;
}
const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
    const role = userCurrentRole();

    if (role !== allowedRole) {
        return <FormError message="You do not have permission to see this content!"></FormError>;
    }
    return <>{children}</>;
};

export default RoleGate;
