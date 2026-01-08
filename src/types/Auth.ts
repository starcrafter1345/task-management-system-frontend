import { z } from "zod";

export interface AuthResponse {
  access_token: string;
}

export interface UserToken {
  access_token: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export const userLoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type userLoginValues = z.infer<typeof userLoginSchema>;

export const userRegisterSchema = z.object({
  username: z.string(),
  email: z.email(),
  password: z.string(),
});

export const registerFormSchema = z
  .object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords must match",
    path: ["repeatPassword"],
  });

export type userRegisterValues = z.infer<typeof userRegisterSchema>;

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
