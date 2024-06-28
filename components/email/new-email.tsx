'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTransition } from 'react';
import { LoginSchema, NewEmailSchema } from '@/schemas';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { toast } from 'sonner';
import { newEmail } from '@/actions/new-email';
import { Textarea } from '../ui/textarea';
import { useRouter } from 'next/navigation';
import { PATH_URL } from '@/constants';
const NewEmail = () => {
    const [isPending, startTransition] = useTransition();
    const router= useRouter()

    const form = useForm<z.infer<typeof NewEmailSchema>>({
        resolver: zodResolver(NewEmailSchema),
        defaultValues: {
            to: '',
            subject: '',
            content: '',
        },
    });
    const onSubit = (values: z.infer<typeof NewEmailSchema>) => {
        console.log('[newEmail]', values);
        startTransition(() => {
            newEmail(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        toast.error(data?.error);
                    }
                    if (data?.success) {
                        form.reset();
                        router.push(PATH_URL.MAIL_BOX)
                        toast.success(data?.success);
                    }
                })
                .catch((error) => toast.error(error));
        });
    };
    return (
        <div className="space-y-4">
            <div className="p-2 font-semibold bg-slate-500 text-white rounded-lg">New Email</div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubit)} className="space-y-4">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="to"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="john.doe@example.com"
                                            type="email"
                                            autoComplete="email"
                                        />
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type="text"
                                            autoComplete="current-subject"
                                        />
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            disabled={isPending}
                                            className="min-h-60"
                                            placeholder="Type your message here."
                                        />
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="max-w-40" disabled={isPending}>
                        Send
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default NewEmail;
