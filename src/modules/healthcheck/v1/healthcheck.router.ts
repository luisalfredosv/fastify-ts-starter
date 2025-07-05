import { healthCheckHandler } from "@modules/healthcheck/v1/healthcheck.handler";
import { healthCheckResponseSchema } from "@modules/healthcheck/v1/healthcheck.schema";
import type { FastifyPluginAsync } from "fastify";
import type { z } from "zod/v4";

const healthCheckRouter: FastifyPluginAsync = async (fastify) => {
	fastify.route<{
		Reply: z.infer<typeof healthCheckResponseSchema>;
	}>({
		method: "GET",
		url: "/",
		schema: {
			summary: "Health Check",
			description: "Check the health status of the service",
			tags: ["Health"],
			response: {
				200: healthCheckResponseSchema,
			},
		},
		handler: healthCheckHandler,
	});
};

export default healthCheckRouter;
