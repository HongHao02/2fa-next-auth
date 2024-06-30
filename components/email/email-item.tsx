'use client'
import { PATH_URL } from '@/constants';
import { EmailType } from '@/types/email.type';
import Link from 'next/link';
import moment from 'moment';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { IconButton, Tooltip } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { trashMail } from '@/actions/email';
import { toast } from 'sonner';
import { useTransition } from 'react';

interface EmailItemProps {
    email: {
        email: {
            subject: string | null;
            id: number;
            sentAt: Date;
            sender: {
                name: string | null;
                id: string;
                email: string;
            };
        };
    };
    type?: EmailType;
    searchKey?: string
}

function EmailItem({ email, type = 'inbox', searchKey }: EmailItemProps) {
    const [isPending, startTransition] = useTransition();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: trashMail,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['receivedEmails'] });
            toast.success("Move to trash successfully.")
        },
        onError: () => {
            toast.error("Something went wrong! Try again.")
        }
    });

    const chooseLink = (type: EmailType): string => {
        switch (type) {
            case 'inbox':
                return `${PATH_URL.MAIL_BOX}/${email.email.id}`;
            case 'trash':
                return `${PATH_URL.MAIL_BOX}/${email.email.id}`;
            case 'redo':
                return `${PATH_URL.MAIL_BOX}/${email.email.id}`;
            case 'search':
                return `${PATH_URL.SEARCH}/${searchKey}/${email.email.id}`;
            default:
                return `${PATH_URL.MAIL_BOX}`
        }
    };
    const handleMoveToTrash = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        startTransition(() => {
            e.preventDefault()
            e.stopPropagation(); // Prevent the Link action
            mutation.mutate(email.email.id);
        })
    };
    return (
        <Link href={chooseLink(type)}>
            <div
                className={`w-full flex p-2 gap-2  text-[12px] cursor-pointer hover:bg-white hover:border-b-[1px] hover:border-l-[1px] hover:shadow-md hover:rounded-sm group relative
                } ${isPending ? 'animate-pulse cursor-progress' : ''}`}
            // onClick={() => dispatch(addActiveEmail(email))}
            >
                <div className="flex-1">
                    <div className="flex">
                        <p className='font-semibold'>{email.email.sender.email}</p>
                        <p className="flex justify-end ml-auto">
                            {moment(email.email.sentAt, 'DD/MM/YYYY hh:mm:ss', true).format('DD/MM/YYYY HH:mm')}
                        </p>
                    </div>
                    <div>{email.email.subject}</div>
                </div>
                <div className={`absolute right-0 top-0 z-[9999] w-40 hidden group-hover:block bg-inherit h-full`}>
                    <div className="flex justify-center gap-1">
                        <Tooltip placement="top" title="save">
                            <IconButton>
                                <ArchiveIcon fontSize="small" color="action"></ArchiveIcon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip placement="top" title="Move to Trash">
                            <IconButton onClick={handleMoveToTrash} disabled={isPending}>
                                <DeleteIcon fontSize="small" color="action"></DeleteIcon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip placement="top" title="Bookmark">
                            <IconButton disabled={true}>
                                <BookmarkAddIcon fontSize="small" color="action"></BookmarkAddIcon>
                            </IconButton>
                        </Tooltip>

                    </div>
                </div>
            </div>
        </Link>
    );
}
export default EmailItem;
