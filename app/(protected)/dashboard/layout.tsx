import React from 'react'

const DashboardLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='flex flex-col h-full justify-center items-center p-2 gap-y-2'>
      {children}
    </div>
  )
}

export default DashboardLayout
