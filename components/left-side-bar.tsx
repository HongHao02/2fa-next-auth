import React from 'react'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from 'next/link'
import { Button } from './ui/button'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { PATH_URL } from '@/constants';

interface ToolTipItemProps {
    trigger: any,
    content: string,
    href: string
}
const SIDE_BAR_LIST: ToolTipItemProps[] = [
    {
        trigger: <MailOutlinedIcon className='w-8 h-8'></MailOutlinedIcon>,
        content: "New Email",
        href: PATH_URL.SIDE_BAR.NEW_EMAIL
    },
    {
        trigger: <MailOutlinedIcon className='w-8 h-8'></MailOutlinedIcon>,
        content: "New Email",
        href: PATH_URL.SIDE_BAR.NEW_EMAIL
    },
    {
        trigger: <MailOutlinedIcon className='w-8 h-8'></MailOutlinedIcon>,
        content: "New Email",
        href: PATH_URL.SIDE_BAR.NEW_EMAIL
    }
]
const ToolTipItem = ({ trigger, content, href }: ToolTipItemProps) => (
    <Link href={href}>
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>{trigger}</TooltipTrigger>
                <TooltipContent align='end'>
                    <p>{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </Link>
)

const LeftSideBar = () => {
    return (
        <>
            {SIDE_BAR_LIST.map(({ trigger, content, href }, index) => (
                <ToolTipItem key={index} trigger={trigger} content={content} href={href} ></ToolTipItem>
            ))}
        </>
    )
}

export default LeftSideBar
