import {
	genderizeHandler,
	ipifyHandler,
} from "@modules/example/v2/example.handler";
import {
	genderizeResponseSchema,
	ipifyResponseSchema,
} from "@modules/example/v2/example.schema";
import type { FastifyPluginAsync, FastifyRequest } from "fastify";
import type { z } from "zod/v4";

const exampleRouter: FastifyPluginAsync = async (fastify) => {
	fastify.route<{
		Body: FastifyRequest;
		Reply: z.infer<typeof ipifyResponseSchema>;
	}>({
		method: "GET",
		url: "/ipify",
		schema: {
			summary: "Public ip address",
			description: "Return the public IP address of the server",
			tags: ["Example"],
			response: {
				200: ipifyResponseSchema,
			},
		},
		handler: ipifyHandler,
	});

	fastify.route<{
		Body: FastifyRequest;
		Reply: z.infer<typeof genderizeResponseSchema>;
	}>({
		method: "GET",
		url: "/genderize",
		schema: {
			summary: "Check the Gender of a Name",
			description: "Return percentage of gender based on a name",
			tags: ["Example"],
			response: {
				200: genderizeResponseSchema,
			},
		},
		handler: genderizeHandler,
	});
};

export default exampleRouter;
