import type { FastifyReply, FastifyRequest } from "fastify";

export const healthcheckController = async (
	_request: FastifyRequest,
	reply: FastifyReply,
) => {
	return reply
		.code(200)
		.send({ status: "ok", timestamp: new Date().toISOString() });
};
