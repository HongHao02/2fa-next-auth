import React from 'react';
import { Button } from './ui/button';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import Link from 'next/link';
import { PATH_URL } from '@/constants';

const Feature = () => {
    return (
        <div>
            <Link href={PATH_URL.SIDE_BAR.NEW_EMAIL}>
                <Button variant={'outline'}>
                    <SendOutlinedIcon className="mr-2 h-4 w-4"></SendOutlinedIcon> New Email
                </Button>
            </Link>
        </div>
    );
};

export default Feature;
