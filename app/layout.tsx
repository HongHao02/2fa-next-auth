import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { Toaster } from '@/components/ui/sonner';
import TanstackProvider from '@/util/TanstackProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'MailBox App',
    description: 'MailBox App for manage your email',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <TanstackProvider>
                    <Toaster richColors position='top-center'></Toaster>
                    {children}
                </TanstackProvider>
            </body>
        </html>
    );
}
