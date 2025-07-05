import { checkGenderByName } from "@modules/example/v2/use-cases/check-gender-by-name.use-case";
import { getPublicIpAddress } from "@modules/example/v2/use-cases/get-public-ip-address.use-case";
import type { FastifyReply, FastifyRequest } from "fastify";

export const genderizeHandler = async (
	{ server }: FastifyRequest,
	reply: FastifyReply
) => {
	const result = await checkGenderByName(server);
	return reply.code(200).send(result);
};

export const ipifyHandler = async (
	{ server }: FastifyRequest,
	reply: FastifyReply
) => {
	const result = await getPublicIpAddress(server);
	return reply.code(200).send(result);
};
