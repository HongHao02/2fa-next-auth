import React from 'react'
import { FaTriangleExclamation } from "react-icons/fa6";
interface FormErrorProps{
    message?:string,

}
const FormError = ({message}:FormErrorProps) => {
    if(!message)return null;
  return (
    <div className='bg-destructive/15 p-2 rounded-md flex items-center gap-x-2 test-sm text-destructive'>
      <FaTriangleExclamation className='w-4 h-4'></FaTriangleExclamation>
      <p>{message}</p>
    </div>
  )
}

export default FormError
