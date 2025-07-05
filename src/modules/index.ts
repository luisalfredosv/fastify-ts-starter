import exampleRouter from "@modules/example/v1/example.router";
import exampleRouterv2 from "@modules/example/v2/example.router";
import healthCheckRouter from "@modules/healthcheck/v1/healthcheck.router";
import type { FastifyPluginAsync } from "fastify";

const routes: FastifyPluginAsync = async (fastify) => {
	fastify.register(
		async (fastify) => {
			fastify.register(healthCheckRouter, { prefix: "/healthcheck" });
			fastify.register(exampleRouter, { prefix: "/example" });
		},
		{ prefix: "/v1" }
	);

	fastify.register(
		async (fastify) => {
			fastify.register(exampleRouterv2, { prefix: "/example" });
		},
		{ prefix: "/v2" }
	);
};

export default routes;
