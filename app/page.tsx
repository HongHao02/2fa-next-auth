import { Button } from '@/components/ui/button';
import { poppins } from '../components/fonts';
import { cn } from '@/lib/utils';
import LoginButton from '@/components/auth/login-button';
import Link from 'next/link';
export default function Home() {
    return (
        <main className="text-white flex h-full flex-col justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-600 to-slate-950">
            <div className="space-y-6 text-center">
                <h1 className={cn('text-6xl font-semibold drop-shadow-sm ', poppins.className)}>🔐Auth</h1>
                <p>A simple authentication service</p>
                <LoginButton mode="modal" asChild>
                    <Button variant={'outline'} size={'lg'} className="text-black">
                        Sign in
                    </Button>
                </LoginButton>
            </div>
        </main>
    );
}
