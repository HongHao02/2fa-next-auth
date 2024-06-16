'use client'
import ErrorCard from '@/components/auth/error-card'
import React from 'react'
import { useSearchParams } from 'next/navigation'
const ErrorPage = () => {
    const searchParams = useSearchParams()
    const error= searchParams.get('error')
    return (
        <ErrorCard error={error}></ErrorCard>
    )
}

export default ErrorPage
