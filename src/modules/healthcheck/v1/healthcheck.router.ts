import type { FastifyPluginAsync } from "fastify";
import { z } from "zod/v4";
import { healthcheckController } from "./healthcheck.controller";
import { healthcheckResponseSchema } from "./healthcheck.schema";

const healthcheckRouter: FastifyPluginAsync = async (fastify) => {
	fastify.route<{
		Reply: z.infer<typeof healthcheckResponseSchema>;
	}>({
		method: "GET",
		url: "/",
		schema: {
			summary: "Comprueba la salud del servicio",
			description: "Devuelve un status y timestamp para monitorización",
			tags: ["Health"],
			response: {
				200: healthcheckResponseSchema,
			},
		},
		handler: healthcheckController,
	});
};

export default healthcheckRouter;
