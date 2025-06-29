import type { FastifyReply, FastifyRequest } from "fastify";
import type { z } from "zod";
import type { exampleRequestSchema } from "./example.schema";

type ExampleRequest = FastifyRequest<{
	Body: z.infer<typeof exampleRequestSchema>;
}>;

export const exampleController = async (
	request: ExampleRequest,
	reply: FastifyReply,
) => {
	const { name } = request.body;
	return reply
		.code(200)
		.send({ message: `Hola ${name}`, timestamp: new Date().toISOString() });
};
