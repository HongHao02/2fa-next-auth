'use client';
import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SettingsSchema } from '@/schemas';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { settings } from '@/actions/settings';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectLabel } from '@/components/ui/select';
import { UserRole } from '@/lib/definitons';
import { Switch } from '@/components/ui/switch';
const SettingPage = () => {
    const user = useCurrentUser();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const { update } = useSession();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user?.name || undefined, //use undefined instead
            email: user?.email || undefined,
            password: undefined, //not show password, if user does not enter password nothing will be updated
            newPassword: undefined,
            role: user?.role || undefined,
            isTwoFactorEnabled: user?.isTowFactorEnable || undefined,
        },
    });
    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            settings(values)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    }
                    if (data.success) {
                        update();
                        setSuccess(data.success);
                    }
                })
                .catch(() => setError('Something went wrong!'));
        });
    };
    return (
        <Card className="w-[800px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">⚙ Settings</p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="John Doe"
                                                disabled={isPending}
                                                autoComplete="name"
                                            />
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            ></FormField>
                            {user?.isOAuth === false && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="john.doe@gmail.com"
                                                        disabled={isPending}
                                                        type="email"
                                                        autoComplete="email"
                                                    />
                                                </FormControl>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        )}
                                    ></FormField>
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="******"
                                                        disabled={isPending}
                                                        type="password"
                                                        autoComplete="current-password"
                                                    />
                                                </FormControl>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        )}
                                    ></FormField>
                                    <FormField
                                        control={form.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="******"
                                                        disabled={isPending}
                                                        type="password"
                                                        autoComplete="new-password"
                                                    />
                                                </FormControl>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        )}
                                    ></FormField>
                                </>
                            )}
                            {user?.isOAuth === false && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="isTwoFactorEnabled"
                                        render={({ field }) => (
                                            <FormItem className="flex justify-between items-center rounded-lg border p-3 shadow-sm">
                                                <div className="space-y-0.5">
                                                    <FormLabel>Two Factor Authentication</FormLabel>
                                                    <FormDescription>
                                                        Enable two factor authentication for your account
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        disabled={isPending}
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    ></Switch>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    ></FormField>
                                </>
                            )}

                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select
                                            disabled={isPending}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a role"></SelectValue>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={UserRole.ADMIN}>ADMIN</SelectItem>
                                                <SelectItem value={UserRole.USER}>USER</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            ></FormField>
                        </div>
                        {!success && <FormError message={error}></FormError>}
                        <FormSuccess message={success}></FormSuccess>
                        <Button type="submit" disabled={isPending}>Save</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default SettingPage;
