import * as React from 'react';
import { Button } from '../ui/button';

interface EmailTemplateProps {
    name: string;
    email: string;
    url: string;
}

export const EmailConfirmRegister: React.FC<Readonly<EmailTemplateProps>> = ({ name, email, url }) => (
    <div>
        <h1>
            Dear <span className="font-bold">{name}</span>!
        </h1>
        <p>
            We have received a request to register for email <span className="font-bold font-mono">{email}</span>. To
            ensure the security for your account, please click the button bellow to confirm your register.
        </p>
        <a href={url}>
            <Button>Confirm register</Button>
        </a>
        <p>
            If you did not initiate this password reset request, please disregard this email. Your account security is
            important to us and we recommend reviewing your account activity for any suspicious behavior.
        </p>
        <p>Thank you for your attention to this matter.</p>
        <p className='mt-2'>Best regards, Petcare System.</p>
    </div>
);
