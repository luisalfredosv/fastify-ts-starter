import type { FastifyReply, FastifyRequest } from "fastify";
import type { z } from "zod/v4";

import type { exampleRequestSchema } from "./example.schema";
import { sayHelloUseCase } from "./use-cases/say-hello.use-case";

export type ExampleRequest = FastifyRequest<{
  Body: z.infer<typeof exampleRequestSchema>;
}>;

export const exampleController = async (
  request: ExampleRequest,
  reply: FastifyReply,
) => {
  const { name } = request.body;
  const result = sayHelloUseCase({ name });
  return reply.code(200).send(result);
};
