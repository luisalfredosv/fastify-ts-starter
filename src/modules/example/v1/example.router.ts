import { exampleController } from "@modules/example/v1/example.controller";
import {
  exampleRequestSchema,
  exampleResponseSchema,
} from "@modules/example/v1/example.schema";
import type { FastifyPluginAsync } from "fastify";
import type { z } from "zod/v4";

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
