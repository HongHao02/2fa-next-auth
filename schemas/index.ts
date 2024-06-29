import { UserRole } from '@prisma/client';
import * as z from 'zod';
export const SettingsSchema = z
    .object({
        name: z.optional(z.string()),
        isTwoFactorEnabled: z.optional(z.boolean()),
        role: z.enum([UserRole.ADMIN, UserRole.USER]),
        email: z.optional(z.string().email()),
        password: z.optional(z.string().min(6)),
        newPassword: z.optional(z.string().min(6)),
    })
    .refine(
        (data) => {
            if (data.password && !data.newPassword) {
                return false;
            }
            if (!data.password && data.newPassword) {
                return false;
            }
            return true;
        },
        {
            message: 'Passowrd is required!',
            path: ['password'],
        },
    );

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Email is required!',
    }),
    password: z.string().min(1, {
        message: 'Password is required!',
    }), //not set min() for login
    code: z.optional(z.string().min(6, { message: 'Two factor code must be 6 charaters!' })),
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

export const NewEmailSchema = z.object({
    to: z.string().email({
        message: 'Email is required!',
    }),
    subject: z.string().min(4, {
        message: 'Minimum 4 characters required!',
    }),
    content: z.string().min(1, {
        message: 'Minimum 1 characters required!',
    }),
});
export const ReplyEmailSchema = z.object({
    body: z.string().min(4, {
        message: 'Minimum 4 characters required!',
    })
});
export const SearchSchema = z.object({
    key: z.string().min(1, {
        message: 'Minimum 1 characters required!',
    })
});
