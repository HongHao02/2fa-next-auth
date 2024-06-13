"use server";
import * as z from 'zod'
import {  RegisterSchema } from '@/schemas';
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log(values);
  const validatedValues= RegisterSchema.safeParse(values)
  if(!validatedValues.success){
    return {error: 'Invalid fields'}
  }
  return {success: 'Send email successfully'}
};
