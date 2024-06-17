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
            login(values).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
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
                                        <Input {...field} disabled={isPending} type="password" placeholder="******" />
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                    <Button size={'sm'} variant="link" asChild className="px-0 font-normal">
                                        <Link href={'/auth/reset-password'}>Forgot password</Link>
                                    </Button>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error || urlError}></FormError>
                    <FormSuccess message={success}></FormSuccess>
                    <Button type="submit" className="w-full" disabled={isPending}>
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default LoginForm;
