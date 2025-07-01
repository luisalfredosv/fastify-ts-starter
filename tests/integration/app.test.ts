import { buildServer } from "../../src/app";
import type { fastify } from "fastify";

describe("buildServer()", () => {
	let app: ReturnType<typeof fastify>;

	afterEach(async () => {
		if (app && !app.closed) {
			await app.close();
		}

		process.env.NODE_ENV = undefined;
	});

	it("raise and answer healthCheck", async () => {
		process.env.NODE_ENV = "development";
		app = buildServer();
		await app.ready();

		const res = await app.inject({
			method: "GET",
			url: "/api/v1/healthcheck",
		});
		expect(res.statusCode).toBe(200);

		const body = res.json();
		expect(body).toEqual({
			status: "ok",
			timestamp: expect.any(String),
		});

		expect(new Date(body.timestamp).toISOString()).toBe(body.timestamp);
	});
});
