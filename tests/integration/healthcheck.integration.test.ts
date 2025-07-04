import type { fastify } from "fastify";
import { buildServer } from "@app";

describe("GET /api/v1/healthcheck", () => {
	let app: ReturnType<typeof fastify>;

	beforeAll(async () => {
		app = buildServer();
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should respond 200 with {status:"ok", timestamp}', async () => {
		const resp = await app.inject({
			method: "GET",
			url: "/api/v1/healthcheck",
		});

		expect(resp.statusCode).toBe(200);
		const body = JSON.parse(resp.payload);
		expect(body).toHaveProperty("status", "ok");
		expect(body).toHaveProperty("timestamp");
		expect(new Date(body.timestamp).toISOString()).toBe(body.timestamp);
	});
});
