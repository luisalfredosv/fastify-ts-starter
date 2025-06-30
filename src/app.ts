import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import docs from "./config/docs";
import { env } from "./config/envs";
import errorHandler from "./config/error-handler";
import { helmetConfig } from "./config/helmet";
import { httpClient } from "./config/http-client";
import { logger } from "./config/logger";
import routes from "./modules";

export function buildServer() {
  const isProduction = env.NODE_ENV === "production";

  const server = fastify({
    loggerInstance: logger,
  }).withTypeProvider<ZodTypeProvider>();

  server.register(errorHandler);

  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);

  if (!isProduction) {
    server.register(docs);
  }

  server.register(helmetConfig);
  server.register(httpClient);
  server.register(routes, { prefix: "/api" });

  return server;
}
