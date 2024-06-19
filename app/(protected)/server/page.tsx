import React, { Suspense } from 'react';
import { currentUser } from '@/lib/auth';
import UserInfo from '@/components/user-info';
import RectangleSkeletonCard from '@/components/rectangle-skeleton-card';


const ServerPage = async () => {
    const user = await currentUser()
    console.log('Server_user ', user);
    
    return (
        <Suspense fallback={<RectangleSkeletonCard className='w-[400px] border border-r-red-400'></RectangleSkeletonCard>}>
            <UserInfo user={user} label='💻 Server component'></UserInfo>
        </Suspense>
    );
};

export default ServerPage;
