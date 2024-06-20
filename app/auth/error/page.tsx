'use client';

import React, { Suspense } from 'react';

import ErrorCard from '@/components/auth/error-card';
import { useSearchParams } from 'next/navigation';
function ErrorWrapper() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    return (
        <>
            <ErrorCard error={error}></ErrorCard>
        </>
    );
}
const ErrorPage = () => {
    return (
        <Suspense>
            <ErrorWrapper></ErrorWrapper>
        </Suspense>
    );
};

export default ErrorPage;
