'use server';
import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';
import { RegisterSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
export const register = async (values: z.infer<typeof RegisterSchema>) => {
    console.log(values);
    const validatedValues = RegisterSchema.safeParse(values);
    if (!validatedValues.success) {
        return { error: 'Invalid fields' };
    }
    const { name, password, email } = validatedValues.data;
    //use bcryptjs to avoid error with bcrypt
    const hashPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email)
    if(existingUser){
      return {error: 'Email already in use!'}
    }
    await db.user.create({
      data: {
        name,
        password: hashPassword,
        email
      }
    })
    //TODO: send verification to email


    return { success: 'Send email successfully' };
};
