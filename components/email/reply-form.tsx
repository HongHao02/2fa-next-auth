'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTransition } from 'react';
import { ReplyEmailSchema } from '@/schemas';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { toast } from 'sonner';
import { newEmail } from '@/actions/new-email';
import { Textarea } from '../ui/textarea';
import { useRouter } from 'next/navigation';
import { PATH_URL } from '@/constants';
import { reply } from '@/actions/reply-email';
import { useMutation, useQueryClient } from '@tanstack/react-query';
const ReplyForm = ({ emailId }: { emailId: number }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<z.infer<typeof ReplyEmailSchema>>({
        resolver: zodResolver(ReplyEmailSchema),
        defaultValues: {
            body: undefined,
        },
    });
    const queryClient = useQueryClient();
    // const mutation = useMutation({
    //     mutationFn: (values: z.infer<typeof ReplyEmailSchema>, emailId: number) => reply(values, emailId),
    //     onSuccess: () => {
    //         queryClient.invalidateQueries(['email-details', id]);
    //     },
    // });
    const onSubit = (values: z.infer<typeof ReplyEmailSchema>) => {
        startTransition(() => {
            reply(values, emailId)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        toast.error(data?.error);
                    }
                    if (data?.success) {
                        form.reset();
                        toast.success(data?.success);
                    }
                })
                .catch((error) => toast.error(error));
            // mutation.mutate(values, emailId);
        });
    };
    return (
        <div className="space-y-4">
            <div className="p-2 font-semibold bg-slate-500 text-white rounded-lg">Reply Email</div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubit)} className="space-y-4">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="body"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            disabled={isPending}
                                            className="min-h-20"
                                            placeholder="Type your reply here."
                                        />
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="max-w-40" disabled={isPending}>
                        Reply
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ReplyForm;
