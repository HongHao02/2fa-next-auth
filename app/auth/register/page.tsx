import React, { Suspense } from 'react';

import RegisterForm from '@/components/auth/register-form';

const RegisterPage = () => {
    return (
        <Suspense>
            <RegisterForm></RegisterForm>
        </Suspense>
    );
};

export default RegisterPage;
