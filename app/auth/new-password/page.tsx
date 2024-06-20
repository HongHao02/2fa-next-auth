import React, { Suspense } from 'react';

import NewPassowrdForm from '@/components/auth/new-passowrd-form';

const NewPasswordPage = () => {
    return (
        <Suspense>
            <NewPassowrdForm></NewPassowrdForm>
        </Suspense>
    );
};

export default NewPasswordPage;
