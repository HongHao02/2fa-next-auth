import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Email is required!',
    }),
    password: z.string().min(1, {
        message: 'Password is required!',
    }), //not set min() for login
    code: z.optional(z.string())
});
export const NewPasswordSchema = z
    .object({
        password: z.string().min(6, {
            message: 'Minimum 6 characters requierd!',
        }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'], // Đặt lỗi vào trường confirmPassword
    });
export const ResetSchema = z.object({
    email: z.string().email({
        message: 'Email is required!',
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Email is required!',
    }),
    password: z.string().min(6, {
        message: 'Minimum 6 characters required!',
    }),
    name: z.string().min(3, {
        message: 'Name is required!',
    }), //not set min() for login
});
