import { PATH_URL } from '@/constants';
import { EmailType } from '@/types/email.type';
import { Email } from '@prisma/client';
import Link from 'next/link';
import moment from 'moment';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { IconButton, Tooltip } from '@mui/material';

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
}

function EmailItem({ email, type = 'inbox' }: EmailItemProps) {
    // const handleMotoTrash = () => {
    //     dispatch(addTrashEmail(email));
    //     if (true) {
    //         handleShowAlert('Move to trash successful', 'success');
    //     }
    // };

    const chooseLink = (type: EmailType): string => {
        switch (type) {
            case 'inbox':
                return `${PATH_URL.MAIL_BOX}/${email.email.id}`;
            case 'trash':
                return `${PATH_URL.MAIL_BOX}/${email.email.id}`;
            case 'redo':
                return `${PATH_URL.MAIL_BOX}/${email.email.id}`;
        }
    };
    return (
        <Link href={chooseLink(type)}>
            <div
                className={`w-full flex p-2 gap-2  text-[12px] cursor-pointer hover:bg-white hover:border-b-[1px] hover:border-l-[1px] hover:shadow-md hover:rounded-sm group relative
                }`}
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
export default EmailItem;
