import z from "zod/v4";

export const exampleRequestSchema = z.object({
  name: z.string().min(3).max(10),
});

export const exampleResponseSchema = z.object({
  message: z.string(),
  timestamp: z.string().datetime(),
});
