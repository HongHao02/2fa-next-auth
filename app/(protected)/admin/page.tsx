'use client';
import { admin } from '@/actions/admin';
import RoleGate from '@/components/auth/role-gate';
import FormSuccess from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { userCurrentRole } from '@/hooks/use-current-role';
import { UserRole } from '@/lib/definitons';
import React from 'react';
import { toast } from 'sonner';

const AdminPage = () => {
    const role = userCurrentRole();
    const onServerActionClick = () => {
        admin().then((res) => {
            if (res.success) {
                toast.success('Server action said: OKE');
            }
            if (res.error) {
                toast.error('Server action said: NO');
            }
        });
    };
    const onApiRouteClick = () => {
        fetch('/api/admin').then((res) => {
            if (res.ok) {
                console.log('OKE');
                toast.success('Allowed API Route');
            } else {
                console.log('FORBIDEN');
                toast.error('FORBIDEN');
            }
        });
    };
    return (
        <Card className="w-[800px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">🗝 Admin</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="You are allowed to see this content!"></FormSuccess>
                </RoleGate>
                <div className="flex flex-row  items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">ADMIN-only API Route</p>
                    <Button onClick={onApiRouteClick}>Click to test</Button>
                </div>
                <div className="flex flex-row  items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">ADMIN-only Server action</p>
                    <Button onClick={onServerActionClick}>Click to test</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default AdminPage;
