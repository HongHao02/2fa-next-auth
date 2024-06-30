'use client'
import { PATH_URL } from '@/constants';
import Link from 'next/link';
import moment from 'moment';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { restoreTrashMail } from '@/actions/email';
import { toast } from 'sonner';

interface TrashItemProps {
    trash: {
        email: {
            id: number;
            subject: string | null;
            body: string | null;
            sentAt: Date;
            sender: {
                email: string;
                id: string;
                name: string | null;
                image: string | null;
            };
        };
        id: number;
        deletedAt: Date;
        previousFolder: string;
    }
}

function TrashItem({ trash }: TrashItemProps) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: restoreTrashMail,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['trash-emails'] });
            toast.success("Restore from trash successfully.")
        },
        onError: () => {
            toast.error("Something went wrong! Try again.")
        }
    });
    const handleRestore = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        e.stopPropagation(); // Prevent the Link action
        mutation.mutate({ emailId: trash.email.id, trashId: trash.id });
    };

    return (
        <Link href={`${PATH_URL.TRASH}/${trash.id}`}>
            <div
                className={`w-full flex p-2 gap-2  text-[12px] cursor-pointer hover:bg-white hover:border-b-[1px] hover:border-l-[1px] hover:shadow-md hover:rounded-sm group relative
                }`}
            // onClick={() => dispatch(addActiveEmail(email))}
            >
                <div className="flex-1">
                    <div className="flex">
                        <p className='w-56 max-w-80'>{trash.email.sender.email}</p>
                        <p>
                            <span className='font-semibold'>{trash.email.subject}--</span>
                            <span className='font-light'>{trash.email.body?.slice(0, 200)}...</span>
                        </p>
                        <p className="flex justify-end ml-auto">
                            {moment(trash.email.sentAt, 'DD/MM/YYYY hh:mm:ss', true).format('DD/MM/YYYY HH:mm')}
                        </p>
                    </div>
                    <div>
                        <p>{`<${trash.email.sender.email}>`}</p>
                    </div>
                </div>
                <div className={`absolute right-0 top-0 z-[9999] w-40 hidden group-hover:block bg-inherit h-full`}>
                    <div className="flex justify-center gap-1">
                        <Tooltip placement="top" title="save">
                            <IconButton>
                                <ArchiveIcon fontSize="small" color="action"></ArchiveIcon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip placement="top" title="Move to Trash">
                            <IconButton>
                                <DeleteIcon fontSize="small" color="action"></DeleteIcon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip placement='top' title="Restore">
                            <IconButton onClick={handleRestore}>
                                <RestoreIcon fontSize="small" color="action"></RestoreIcon>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </Link>
    );
}
export default TrashItem;
