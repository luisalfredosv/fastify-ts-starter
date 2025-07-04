import docs from "@config/docs";
import { env } from "@config/env";
import errorHandler from "@config/error-handler";
import { helmetConfig } from "@config/helmet";
import { httpClient } from "@config/http-client";
import { logger } from "@config/logger";
import routes from "@modules/index";
import { isProduction } from "@utils/is-production";
import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";

export function buildServer() {
	const isProd = isProduction();

	const server = fastify({
		loggerInstance: logger,
	}).withTypeProvider<ZodTypeProvider>();

	server.register(errorHandler);

	server.setValidatorCompiler(validatorCompiler);
	server.setSerializerCompiler(serializerCompiler);

	if (!isProd) {
		server.register(docs);
	}

	server.register(helmetConfig);
	server.register(httpClient);
	server.register(routes, { prefix: env.SERVER_PREFIX });

	return server;
}
