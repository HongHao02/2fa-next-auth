export type EmailType = 'inbox' | 'trash' | 'redo' | 'search';

export interface UserPlaceHolder{
    idUser: number,
    email: string,
    name: string,
}

export interface EmailPlaceHolder{
    id: number,
    from: UserPlaceHolder,
    to: UserPlaceHolder,
    subject: string,
    content: string,
    time: string,
}

export interface ShortReceivedEmail{
    
}