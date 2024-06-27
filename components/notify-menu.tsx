import React from 'react'

import Box from "@mui/material/Box";
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Badge, IconButton } from '@mui/material';
const NotifyMenu = () => {
    return (
        <>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                >
                    <Badge badgeContent={4} color="error">
                        <MailOutlineRoundedIcon className=' text-white w-8 h-8' />
                    </Badge>
                </IconButton>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsOutlinedIcon className='w-8 h-8 text-white' />
                    </Badge>
                </IconButton>
            </Box>
        </>
    )
}

export default NotifyMenu
