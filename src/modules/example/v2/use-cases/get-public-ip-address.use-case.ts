import type { ipifyResponseSchema } from "@modules/example/v2/example.schema";
import type { AxiosResponse } from "axios";
import type { FastifyInstance } from "fastify";
import type { z } from "zod/v4";

export async function getPublicIpAddress(
	server: FastifyInstance
): Promise<AxiosResponse<z.infer<typeof ipifyResponseSchema>>> {
	const result = server.ipify.get("/?format=json");
	return result;
}
