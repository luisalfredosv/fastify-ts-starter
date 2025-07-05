import z from "zod/v4";

export const genderizeResponseSchema = z.object({
	count: z.number(),
	name: z.string(),
	gender: z.string(),
	probability: z.number().min(0).max(1),
});

export const ipifyResponseSchema = z.object({
	ip: z.string(),
});
