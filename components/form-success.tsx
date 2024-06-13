import { CircleCheckIcon } from 'lucide-react';
import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
interface FormSuccessProps{
    message?:string,

}
const FormSuccess = ({message}:FormSuccessProps) => {
    if(!message)return null;
  return (
    <div className='bg-emerald-500 p-2 rounded-md flex items-center gap-x-2 test-sm text-white'>
      <FaCheckCircle className='w-4 h-4'></FaCheckCircle>
      <p>{message}</p>
    </div>
  )
}

export default FormSuccess
