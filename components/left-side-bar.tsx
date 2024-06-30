import React from 'react'

import Link from 'next/link'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import { PATH_URL } from '@/constants';
import { IconButton, Tooltip } from '@mui/material';
import DraftsIcon from '@mui/icons-material/Drafts';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

interface ToolTipItemProps {
    trigger: any,
    content: string,
    href: string
}
const SIDE_BAR_LIST: ToolTipItemProps[] = [
    {
        trigger: <Tooltip placement='right' title="New Email">
            <IconButton><MailOutlinedIcon className='w-6 h-6'></MailOutlinedIcon></IconButton>
        </Tooltip>,
        content: "New Email",
        href: PATH_URL.SIDE_BAR.NEW_EMAIL
    },
    {
        trigger: <Tooltip placement='right' title="Send Items">
            <IconButton><SendIcon className='w-6 h-6'></SendIcon></IconButton>
        </Tooltip>,
        content: "Send Items",
        href: PATH_URL.SEND_EMAIL
    },
    {
        trigger: <Tooltip placement='right' title="Drafts">
            <IconButton><DraftsIcon className='w-6 h-6'></DraftsIcon></IconButton>
        </Tooltip>,
        content: "Drafts",
        href: PATH_URL.DRAFTS
    },
    {
        trigger: <Tooltip placement='right' title="Settings">
            <IconButton><ManageAccountsIcon className='w-6 h-6'></ManageAccountsIcon></IconButton>
        </Tooltip>,
        content: "Settings",
        href: PATH_URL.SETTNG
    },

]
const ToolTipItem = ({ trigger, content, href }: ToolTipItemProps) => (
    <Link href={href}>
        {/* <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>{trigger}</TooltipTrigger>
                <TooltipContent align='end'>
                    <p>{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider> */}
        {trigger}
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
