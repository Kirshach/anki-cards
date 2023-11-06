import { z } from "zod";

export const emailSchema = z
  .string({
    required_error: "Email is required",
  })
  .min(1, { message: "Email is required" })
  .email({
    message:
      'Invalid email format:\n email should contain "@" symbol and domain name',
  });

export const usernameSchema = z
  .string({
    required_error: "Username is required",
  })
  .min(1, { message: "Username is required" });

export const passwordSchema = z
  .string({
    required_error: "Password is required",
  })
  .min(7, {
    message: "Password should be at least 7 characters long",
  })
  .max(20, {
    message: "Password should be at most 20 characters long",
  })
  .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/, {
    message:
      "Password should contain at least one number, one lowercase and one uppercase letter",
  });

export const repeatedPasswordSchema = z
  .string({
    required_error: "Repeated password is required",
  })
  .min(1, { message: "Repeated password is required" });
