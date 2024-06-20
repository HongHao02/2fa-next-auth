'use client';

import React, { Suspense } from 'react';

import ErrorCard from '@/components/auth/error-card';
import { useSearchParams } from 'next/navigation';
const ErrorPage = () => {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    return (
        <Suspense>
            <ErrorCard error={error}></ErrorCard>
        </Suspense>
    );
};

export default ErrorPage;
