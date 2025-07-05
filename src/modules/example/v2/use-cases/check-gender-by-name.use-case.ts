import type { genderizeResponseSchema } from "@modules/example/v2/example.schema";
import type { AxiosResponse } from "axios";
import type { FastifyInstance } from "fastify";
import type { z } from "zod/v4";

export async function checkGenderByName(
	server: FastifyInstance
): Promise<AxiosResponse<z.infer<typeof genderizeResponseSchema>>> {
	const result = await server.genderize.get("/?name=luc");
	return result;
}
