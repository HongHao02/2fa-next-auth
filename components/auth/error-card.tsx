import React from 'react'

import CardWrapper from './card-wrapper'
import { FaExclamationTriangle } from 'react-icons/fa'

const ErrorCard = ({error}:{error: any}) => {
    return (
        <CardWrapper backButtonLabel='Back to login' backButtonHref='/auth/login' headerLabel='Oops! Something went wrong'>
            <div className='flex justify-center items-center gap-x-2'>
                <FaExclamationTriangle className='text-destructive'></FaExclamationTriangle>
                {error}
            </div>
        </CardWrapper>
    )
}

export default ErrorCard
