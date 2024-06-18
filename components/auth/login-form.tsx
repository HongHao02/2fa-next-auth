'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useTransition } from 'react';
import { useSearchParams } from 'next/navigation';

import CardWrapper from './card-wrapper';
import { LoginSchema } from '@/schemas';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import FormError from '../form-error';
import FormSuccess from '../form-success';
import { login } from '@/actions/login';
import Link from 'next/link';

const LoginForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>('');
    const [showTowFactor, setShowTowFactor] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | undefined>('');
    // const router= useRouter()

    const searchParams = useSearchParams();
    const urlError =
        searchParams.get('error') === 'OAuthAccountNotLinked' ? 'Email already in use with different provider' : '';

    // useEffect(() => {
    //     if (error) {
    //         // Sign out the user to clear the OAuth session
    //         signOut({ callbackUrl: '/auth/login' });
    //     }
    // }, [error, router]);
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const onSubit = (values: z.infer<typeof LoginSchema>) => {
        setError('');
        setSuccess('');
        startTransition(() => {
            login(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        setError(data?.error);
                    }
                    if (data?.success) {
                        form.reset();
                        setError(data?.success);
                    }
                    if (data?.twoFactor) {
                        setShowTowFactor(true);
                    }
                })
                .catch((error) => setError('Something went wrong!'));
        });
    };
    return (
        <CardWrapper
            headerLabel="Welcome back"
            backButtonHref="/auth/register"
            backButtonLabel="Don't have an acoount"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubit)} className="space-y-4">
                    <div className="space-y-4">
                        {!showTowFactor ? (
                            <>
                                {' '}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="john.doe@example.com"
                                                    type="email"
                                                    autoComplete='email'
                                                />
                                            </FormControl>
                                            <FormMessage></FormMessage>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    type="password"
                                                    placeholder="******"
                                                    autoComplete='current-password'
                                                />
                                            </FormControl>
                                            <FormMessage></FormMessage>
                                            <Button size={'sm'} variant="link" asChild className="px-0 font-normal">
                                                <Link href={'/auth/reset-password'}>Forgot password</Link>
                                            </Button>
                                        </FormItem>
                                    )}
                                />
                            </>
                        ) : (
                            <>
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Two Factor Code</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    type="text"
                                                    placeholder="123456"
                                                    autoComplete='current-password'
                                                />
                                            </FormControl>
                                            <FormMessage></FormMessage>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                    </div>
                    <FormError message={error || urlError}></FormError>
                    <FormSuccess message={success}></FormSuccess>
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {showTowFactor ? 'Confirm' : 'Login'}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default LoginForm;
