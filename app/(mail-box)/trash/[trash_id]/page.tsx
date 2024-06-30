'use client';
import EmailDetails from '@/components/email/email-details';
import { useParams } from 'next/navigation';
import React from 'react';

const TrashMailContent = () => {
    const { trash_id } = useParams();
    return <EmailDetails id={trash_id as string}></EmailDetails>;
};

export default TrashMailContent;
