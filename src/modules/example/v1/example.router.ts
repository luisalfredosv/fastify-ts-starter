import type { FastifyPluginAsync } from "fastify";
import { z } from "zod/v4";
import { exampleController } from "./example.controller";
import { exampleRequestSchema, exampleResponseSchema } from "./example.schema";

const exampleRouter: FastifyPluginAsync = async (fastify) => {
	fastify.route<{
		Body: z.infer<typeof exampleRequestSchema>;
		Reply: z.infer<typeof exampleResponseSchema>;
	}>({
		method: "POST",
		url: "/",
		schema: {
			summary: "Ruta de ejemplo",
			description: "Devuelve un saludo y el timestamp",
			tags: ["Example"],
			body: exampleRequestSchema,
			response: {
				200: exampleResponseSchema,
			},
		},
		handler: exampleController,
	});
};

export default exampleRouter;
