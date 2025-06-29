import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import type { FastifyInstance } from "fastify";

import fp from "fastify-plugin";
import {
	jsonSchemaTransform,
	jsonSchemaTransformObject,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./envs";

export default fp(async (fastify: FastifyInstance) => {
	fastify.register(swagger, {
		openapi: {
			info: {
				title: "Service Docs",
				version: "1.0.0",
				description: "Documentation for the service",
			},
		},
		transform: jsonSchemaTransform,
		transformObject: jsonSchemaTransformObject,
	}).withTypeProvider<ZodTypeProvider>;

	fastify.register(swaggerUI, {
		routePrefix: "/docs",
		uiConfig: {
			docExpansion: "list",
			defaultModelsExpandDepth: 1,
		},
		staticCSP: true,
		transformSpecification: (swaggerObject) => {
			return swaggerObject;
		},
		transformSpecificationClone: true,
	});
});
