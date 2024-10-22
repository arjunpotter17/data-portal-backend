import { z } from 'zod';

export const registerUserSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
  companyName: z.string().nonempty("Company name is required"),
  companyWebsite: z.string().url("Invalid URL").nonempty("Company website is required"),
  interestedIn: z.string().nonempty("At least one interest is required"),
});

export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }).min(1,{ message: 'Email is required' }),
});
