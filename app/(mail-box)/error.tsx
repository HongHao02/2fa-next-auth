'use client'; // Error components must be Client Components

import React from 'react';
import FrownIcon from '@/components/icons/FrownIcon';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { ImportIcon } from 'lucide-react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className='w-full h-[calc(100vh-160px)]'>
      <div className='flex flex-col justify-center w-full h-full max-w-sm space-y-4 mx-auto text-center'>
        <div className='mx-auto rounded-full border-gray-200 border-2 w-24 h-24 flex items-center justify-center dark:border-gray-800'>
          <FrownIcon className='w-8 h-8' />
        </div>
        <div className='space-y-2'>
          <h1 className='text-3xl font-bold'>Oops! Something went wrong.</h1>
          <p className='text-gray-500'>It looks like something&apos;s not right. Don&apos;t worry, we&apos;re on it.</p>
        </div>
        <div className='space-y-2'>
          <p className='text-sm text-gray-500'>If this issue persists, please contact our Support</p>
          <Button size='sm' variant='outline' onClick={() => reset()}>
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
}
