'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useTransition } from 'react';
import { useSearchParams } from 'next/navigation';

import CardWrapper from './card-wrapper';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import FormError from '../form-error';
import FormSuccess from '../form-success';
import { NewPasswordSchema } from '@/schemas';
import { newPassowrd } from '@/actions/new-password';

const NewPassowrdForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });
    const onSubit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError('');
        setSuccess('');
        startTransition(() => {
            newPassowrd(values, token).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
    };
    return (
        <CardWrapper headerLabel="Enter new password" backButtonHref="/auth/login" backButtonLabel="Back to login">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubit)} className="space-y-4">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} placeholder="******" type="password" autoComplete='current-password'/>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} placeholder="******" type="password" autoComplete='current-password'/>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error}></FormError>
                    <FormSuccess message={success}></FormSuccess>
                    <Button type="submit" className="w-full" disabled={isPending}>
                        Reset Password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default NewPassowrdForm;
