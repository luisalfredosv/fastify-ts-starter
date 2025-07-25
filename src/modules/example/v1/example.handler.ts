import type { exampleRequestSchema } from "@modules/example/v1/example.schema";
import { sayHelloUseCase } from "@modules/example/v1/use-cases/say-hello.use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { z } from "zod/v4";

export type ExampleRequest = FastifyRequest<{
	Body: z.infer<typeof exampleRequestSchema>;
}>;

export const exampleHandler = async (
	request: ExampleRequest,
	reply: FastifyReply
) => {
	const { name } = request.body;
	const result = sayHelloUseCase({ name });
	return reply.code(200).send(result);
};
