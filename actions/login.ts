"use server";
import * as z from 'zod'
import { LoginSchema } from '@/schemas';
export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log(values);
  const validatedValues= LoginSchema.safeParse(values)
  if(!validatedValues.success){
    return {error: 'Invalid fields'}
  }
  return {success: 'Send email successfully'}
};
