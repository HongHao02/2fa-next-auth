import { PATH_URL } from '@/constants';
import { EmailType } from '@/types/email.type';
import { Email } from '@prisma/client';
import Link from 'next/link';
import moment from 'moment';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { IconButton, Tooltip } from '@mui/material';
import { Badge } from '../ui/badge';

interface SendEmailItemProps {
    email: {
        id: number;
        subject: string | null;
        sentAt: Date;
        recipients: {
            recipient: {
                id: string;
                email: string;
                name: string | null;
            };
        }[];
    };
}

function SendEmailItem({ email }: SendEmailItemProps) {
    // const handleMotoTrash = () => {
    //     dispatch(addTrashEmail(email));
    //     if (true) {
    //         handleShowAlert('Move to trash successful', 'success');
    //     }
    // };

    return (
        <Link href={`${PATH_URL.SEND_EMAIL}/${email.id}`}>
            <div
                className={`w-full flex p-2 gap-2  text-[12px] cursor-pointer hover:bg-white hover:border-b-[1px] hover:border-l-[1px] hover:shadow-md hover:rounded-sm group relative
                }`}
                // onClick={() => dispatch(addActiveEmail(email))}
            >
                <div className="flex-1">
                    <div className="flex">
                        <div className="font-semibold flex gap-1">
                            {email.recipients.map(({recipient}, index) => (
                                <Badge key={index} variant="secondary">
                                    {recipient.email}
                                </Badge>
                            ))}
                        </div>
                        <p className="flex justify-end ml-auto">
                            {moment(email.sentAt, 'DD/MM/YYYY hh:mm:ss', true).format('DD/MM/YYYY HH:mm')}
                        </p>
                    </div>
                    <div>{email.subject}</div>
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
                        <IconButton>
                            <BookmarkAddIcon fontSize="small" color="action"></BookmarkAddIcon>
                        </IconButton>
                    </div>
                </div>
            </div>
        </Link>
    );
}
export default SendEmailItem;
