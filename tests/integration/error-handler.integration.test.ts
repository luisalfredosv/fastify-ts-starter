import fastify from "fastify";
import { buildServer } from "../../src/app";

describe("Error Handler Integration Tests", () => {
	let app: ReturnType<typeof fastify>;

	beforeAll(async () => {
		app = buildServer();
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should return 400 for missing fields on POST /api/v1/example", async () => {
		const response = await app.inject({
			method: "POST",
			url: "/api/v1/example",
			payload: {},
		});
		const body = JSON.parse(response.payload);

		expect(response.statusCode).toBe(400);
		expect(body.status).toBe("error");
		expect(body.code).toBe(400);
		expect(Array.isArray(body.errors)).toBe(true);
	});

	it("should return 200 and the correct message for a valid request", async () => {
		const response = await app.inject({
			method: "POST",
			url: "/api/v1/example",
			payload: { name: "Luis" },
		});
		const body = JSON.parse(response.payload);

		expect(response.statusCode).toBe(200);

		expect(body).toEqual(
			expect.objectContaining({
				message: expect.stringContaining("Hola Luis"),
				timestamp: expect.any(String),
			})
		);
	});
});
