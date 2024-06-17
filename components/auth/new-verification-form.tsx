'use client';
import React from 'react';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import CardWrapper from './card-wrapper';
import { newVerificationToken } from '@/actions/new-verification';
import FormError from '../form-error';
import FormSuccess from '../form-success';

const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const onSubmit = useCallback(() => {
        if(success || error) return;
        if (!token) {
            setError('Missing token!');
            return;
        }
        newVerificationToken(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch((error) => {
                setError('Something went wrong!');
            });
    }, [token, success]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper headerLabel="Confirm your email" backButtonHref="/auth/login" backButtonLabel="Back to logi">
            <div className="flex w-full justify-center items-center">
                {!success && !error && <BeatLoader></BeatLoader>}
                <FormSuccess message={success}></FormSuccess>
                {!success && <FormError message={error}></FormError>}
            </div>
        </CardWrapper>
    );
};

export default NewVerificationForm;
