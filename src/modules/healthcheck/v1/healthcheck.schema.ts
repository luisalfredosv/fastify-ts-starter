import { z } from "zod/v4";

export const healthcheckResponseSchema = z.object({
	status: z.string(),
	timestamp: z.string().datetime(),
});
