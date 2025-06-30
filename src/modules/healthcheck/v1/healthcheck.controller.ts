import type { FastifyReply, FastifyRequest } from "fastify";

import { getHealthStatusUseCase } from "./use-cases/get-health-status.use-case";

export const healthCheckController = async (
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  const result = getHealthStatusUseCase();
  return reply.code(200).send(result);
};
