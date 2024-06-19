import React from 'react';

import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';

interface RectangleSkeletonCardProps {
    className?: string;
}
const RectangleSkeletonCard = ({ className }: RectangleSkeletonCardProps) => {
    return <Skeleton className={cn('rounded-xl w-[800px]', className)}></Skeleton>;
};

export default RectangleSkeletonCard;
