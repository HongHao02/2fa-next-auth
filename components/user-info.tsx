import { User } from 'next-auth';

interface userInforProps {
    user?: User;
    label: string;
}

import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';

const UserInfo = ({ user, label }: userInforProps) => {
    return (
        <Card className="w-[800px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">{label}</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm ">
                    <p className="text-sm font-medium">ID</p>
                    <p className="truncate text-xs max-w-[200px] font-mono p-1 bg-slate-300 rounded-md">{user?.id}</p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm ">
                    <p className="text-sm font-medium">Name</p>
                    <p className="truncate text-xs max-w-[200px] font-mono p-1 bg-slate-300 rounded-md">{user?.name}</p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm ">
                    <p className="text-sm font-medium">Email</p>
                    <p className="truncate text-xs max-w-[200px] font-mono p-1 bg-slate-300 rounded-md">
                        {user?.email}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm ">
                    <p className="text-sm font-medium">Role</p>
                    <p className="truncate text-xs max-w-[200px] font-mono p-1 bg-slate-300 rounded-md">{user?.role}</p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm ">
                    <p className="text-sm font-medium">TWO Factor Authentication</p>
                    <Badge variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}>
                        {user?.isTwoFactorEnabled ? 'ON' : 'OFF'}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserInfo;
