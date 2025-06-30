import type { FastifyPluginAsync } from "fastify";
import type { z } from "zod/v4";

import { healthCheckController } from "./healthcheck.controller";
import { healthCheckResponseSchema } from "./healthcheck.schema";

const healthCheckRouter: FastifyPluginAsync = async (fastify) => {
  fastify.route<{
    Reply: z.infer<typeof healthCheckResponseSchema>;
  }>({
    method: "GET",
    url: "/",
    schema: {
      summary: "Comprueba la salud del servicio",
      description: "Devuelve un status y timestamp para monitorización",
      tags: ["Health"],
      response: {
        200: healthCheckResponseSchema,
      },
    },
    handler: healthCheckController,
  });
};

export default healthCheckRouter;
