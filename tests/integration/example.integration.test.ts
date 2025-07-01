import { buildServer } from "../../src/app";
import type { fastify } from "fastify";

describe("POST /api/v1/example", () => {
	let app: ReturnType<typeof fastify>;

	beforeAll(async () => {
		app = buildServer();
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should return 200 for valid request", async () => {
		const response = await app.inject({
			method: "POST",
			url: "/api/v1/example",
			payload: { name: "Luis" },
		});
		const body = JSON.parse(response.payload);

		expect(response.statusCode).toBe(200);
		expect(body).toHaveProperty("message", "Hola Luis");
		expect(body).toHaveProperty("timestamp");
	});

	it("You should answer 400 if the name is too short.", async () => {
		const resp = await app.inject({
			method: "POST",
			url: "/api/v1/example",
			payload: { name: "Lu" },
		});

		expect(resp.statusCode).toBe(400);
		const body = JSON.parse(resp.payload);
		expect(body).toHaveProperty("status", "error");
		expect(body).toHaveProperty("code", 400);
		expect(Array.isArray(body.errors)).toBe(true);
	});
});
