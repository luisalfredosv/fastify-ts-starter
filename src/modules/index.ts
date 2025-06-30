import type { FastifyPluginAsync } from "fastify";

import exampleRouter from "./example/v1/example.router";
import healthcheckRouter from "./healthcheck/v1/healthcheck.router";

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(
    async (fastify) => {
      fastify.register(healthcheckRouter, { prefix: "/healthcheck" });
      fastify.register(exampleRouter, { prefix: "/example" });
    },
    { prefix: "/v1" },
  );

  // example
  fastify.register(
    async (fastify) => {
      fastify.register(healthcheckRouter, { prefix: "/healthcheck" });
      fastify.register(exampleRouter, { prefix: "/example" });
    },
    { prefix: "/v2" },
  );
};

export default routes;
