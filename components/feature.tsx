import React from 'react'
import { Button } from './ui/button'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const Feature = () => {
    return (
        <div>
            <Button variant={'outline'}><SendOutlinedIcon className='mr-2 h-4 w-4'></SendOutlinedIcon> New Email</Button>
        </div>
    )
}

export default Feature
