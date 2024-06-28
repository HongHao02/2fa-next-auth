'use client';
import EmailDetails from '@/components/email/email-details';
import { useParams } from 'next/navigation';
import React from 'react';

const SendMailContent = () => {
    const { send_id } = useParams();
    return <EmailDetails id={send_id as string}></EmailDetails>;
};

export default SendMailContent;
