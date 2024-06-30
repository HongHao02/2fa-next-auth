import React from 'react'

const NoData = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='flex w-full h-full justify-center items-center font-semibold'>
      {children}
    </div>
  )
}

export default NoData
