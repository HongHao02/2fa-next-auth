'use client';
import EmailDetails from '@/components/email/email-details';
import { useParams } from 'next/navigation';
import React from 'react';

const MailContent = () => {
    const { mail_id } = useParams();
    return <EmailDetails id={mail_id as string}></EmailDetails>;
};

export default MailContent;
