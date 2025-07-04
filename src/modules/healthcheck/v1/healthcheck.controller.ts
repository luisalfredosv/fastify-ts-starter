import { getHealthStatusUseCase } from "@modules/healthcheck/v1/use-cases/get-health-status.use-case";
import type { FastifyReply, FastifyRequest } from "fastify";

export const healthCheckController = async (
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  const result = getHealthStatusUseCase();
  return reply.code(200).send(result);
};
