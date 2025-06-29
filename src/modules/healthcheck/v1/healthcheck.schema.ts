import { z } from "zod/v4";

export const healthCheckResponseSchema = z.object({
	status: z.string(),
	timestamp: z.iso.datetime(),
});
