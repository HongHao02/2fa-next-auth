'use client';
import React, { useState } from 'react';

import { Avatar, Button, Divider, Stack } from '@mui/material';
import moment from 'moment';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ReplyIcon from '@mui/icons-material/Reply';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getEmailDetails } from '@/actions/email-detail';
import ReplyForm from './reply-form';
import { HashLoader } from 'react-spinners';

// import _ from 'lodash';

const EmailDetails = ({ id }: { id: string }) => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const { data, error, isLoading } = useQuery({
        queryKey: ['email-details', id],
        queryFn: () => getEmailDetails(parseInt(id))
    });
    console.log('data ', data);

    if (isLoading) return <div className='h-full flex justify-center items-center'><HashLoader color='#0284c7'></HashLoader></div>;
    if (error) return <div>Error loading data: {error.message}</div>;
    return (
        <div className="h-full space-y-2">
            <div className="ps-14 py-4 font-bold text-2xl">{data?.email?.subject}</div>
            <div className="flex gap-4 ">
                <Avatar alt="Travis Howard" src={data?.email?.sender.image || '/no_avt_male.jpg'}></Avatar>
                <div className="flex flex-1 flex-col gap-y-2">
                    <div className="flex gap-2 text-sm">
                        <span className="font-bold">{data?.email?.sender.name}</span>
                        <span className="font-light">{data?.email?.sender.email}</span>
                        <div className="flex flex-1 gap-1 justify-end ">
                            <div>
                                {moment(data?.email?.sentAt, 'DD/MM/YYYY hh:mm:ss', true).format('DD/MM/YYYY HH:mm')}
                            </div>
                            <StarBorderIcon fontSize="small"></StarBorderIcon>
                        </div>
                    </div>
                    <div className="text-sm font-light">receiver</div>
                    <div className="mt-4 text-justify">{data?.email?.body}</div>
                    <Divider></Divider>
                    <div className="flex flex-col gap-2">
                        {data?.email?.replies.map((reply) => (
                            <>
                                <div className="flex gap-4 ">
                                    <Avatar alt="Travis Howard" src={reply.sender.image || '/no_avt_male.jpg'}></Avatar>
                                    <div className="flex flex-1 flex-col gap-y-2">
                                        <div className="flex gap-2 text-sm">
                                            <span className="font-bold">{reply.sender.name}</span>
                                            <span className="font-light">{reply.sender.email}</span>
                                            <div className="flex flex-1 gap-1 justify-end ">
                                                <div>
                                                    {moment(reply.repliedAt, 'DD/MM/YYYY hh:mm:ss', true).format(
                                                        'DD/MM/YYYY HH:mm',
                                                    )}
                                                </div>
                                                <StarBorderIcon fontSize="small"></StarBorderIcon>
                                            </div>
                                        </div>
                                        <div className="text-sm font-light">reply</div>
                                        <div className="mt-4 text-justify">{reply.body}</div>
                                    </div>
                                </div>
                                <Divider></Divider>
                            </>
                        ))}
                    </div>
                    <div className="">
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="outlined"
                                startIcon={<ReplyIcon />}
                                color="inherit"
                                onClick={() => setShowForm(!showForm)}
                            >
                                Reply
                            </Button>
                            <Button variant="outlined" endIcon={<ReplyAllIcon />} color="inherit">
                                Reply on
                            </Button>
                            <Button variant="outlined" endIcon={<ArrowForwardIcon />} color="inherit">
                                Foward
                            </Button>
                        </Stack>
                    </div>
                    {showForm && <ReplyForm emailId={data?.email ? data.email.id : 0}></ReplyForm>}
                </div>
            </div>
        </div>
    );
};

export default EmailDetails;
