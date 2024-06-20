import React, { Suspense } from 'react';

import LoginForm from '@/components/auth/login-form';

const LoginPage = () => {
    return (
        <Suspense>
            <LoginForm></LoginForm>
        </Suspense>
    );
};

export default LoginPage;
