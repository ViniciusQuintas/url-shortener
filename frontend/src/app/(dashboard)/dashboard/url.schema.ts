import { z } from "zod";

export const urlSchema = z.object({
  originalUrl: z.url(),
  expiresAt: z.string().optional(),
});

export type UrlFormData = z.infer<typeof urlSchema>;
