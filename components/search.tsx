'use client'
import React, { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SearchSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { PATH_URL } from "@/constants";
import { CustomInput } from "./ui/custom-input";
import { IconButton, InputBase } from "@mui/material";


const Search = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<z.infer<typeof SearchSchema>>({
        resolver: zodResolver(SearchSchema),
        defaultValues: {
            key: undefined,
        },
    });
    const onSubit = (values: z.infer<typeof SearchSchema>) => {
        const isValidValues = SearchSchema.safeParse(values)
        if (isValidValues.success) {
            startTransition(() => {
                router.push(`${PATH_URL.SEARCH}/${isValidValues.data.key}`)
                // mutation.mutate(values, emailId);
            });
        }

    };

    return (
        <div className="w-[200px] lg:w-[1000px] max-w-sm  bg-white px-2 py-1 rounded-md ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubit)} className=" flex items-center gap-1" onReset={() => form.reset()}>
                    <IconButton type="submit"><SearchOutlinedIcon className="w-7 h-7"></SearchOutlinedIcon></IconButton>
                    <div className="space-y-4 flex-grow">
                        <FormField
                            control={form.control}
                            name="key"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <InputBase sx={{width: '100%' , marginRight: '10px'}}  type='text' placeholder="Enter your content..." {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* <Button type="reset" variant={'icon'}><ClearOutlinedIcon className="w-7 h-7"></ClearOutlinedIcon></Button> */}
                </form>
            </Form>


        </div>
    )
}

export default Search
