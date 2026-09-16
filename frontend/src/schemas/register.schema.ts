import { z } from "zod";

export const registerSchema = z.object({
  name: z.string(),
  email: z.email("E-mail inválido"),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters" }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
