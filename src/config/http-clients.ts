import type { AxiosInstance } from "axios";
import axios from "axios";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
	interface FastifyInstance {
		genderize: AxiosInstance;
		ipify: AxiosInstance;
	}
}

export async function httpClient(
	server: FastifyInstance,
	_opts: unknown
): Promise<void> {
	const genderize = axios.create({
		baseURL: "https://api.genderize.io",
		timeout: 5000,
		headers: {
			"Content-Type": "application/json",
		},
	});

	const ipify = axios.create({
		baseURL: "https://api64.ipify.org?format=json",
		timeout: 5000,
		headers: {
			"Content-Type": "application/json",
		},
	});

	[genderize, ipify].forEach((client) => {
		client.interceptors.response.use(
			(response) => response.data,
			(error) => {
				server.log.error("HTTP Client Error:", error);
				return Promise.reject(error);
			}
		);
	});

	server.decorate("genderize", genderize);
	server.decorate("ipify", ipify);
}

export default fp(httpClient, { name: "httpClients" });
