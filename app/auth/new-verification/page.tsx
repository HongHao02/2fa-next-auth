import React, { Suspense } from 'react';

import NewVerificationForm from '@/components/auth/new-verification-form';

const NewVerificationPage = () => {
    return (
        <Suspense>
            <NewVerificationForm></NewVerificationForm>
        </Suspense>
    );
};

export default NewVerificationPage;
