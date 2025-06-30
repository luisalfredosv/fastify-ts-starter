import fastify, { FastifyError } from "fastify";
import errorHandler from "../../src/config/error-handler";
import { buildServer } from "../../src/app";

describe("Error Handler Unit Tests", () => {
	let app: ReturnType<typeof fastify>;

	beforeAll(async () => {
		app = buildServer();
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should handle validation errors and return 400 with errors array", async () => {
		app.get("/validation", async () => {
			const err: FastifyError & {
				validation: Array<{ message?: string; instancePath?: string }>;
			} = new Error("") as any;
			err.validation = [
				{
					message: "Invalid value",
					instancePath: "/name",
					keyword: "type",
					schemaPath: "#/properties/name/type",
					params: {},
				},
			];
			throw err;
		});

		const response = await app.inject({
			method: "GET",
			url: "/validation",
		});
		const body = JSON.parse(response.payload);

		expect(response.statusCode).toBe(400);
		expect(body).toEqual({
			status: "error",
			code: 400,
			errors: [{ field: "name", message: "Invalid value" }],
		});
	});

	it("should handle custom statusCode on error and return it", async () => {
		app.get("/custom", async () => {
			const err = new Error("Forbidden") as FastifyError & {
				statusCode?: number;
			};
			err.statusCode = 403;
			throw err;
		});

		const response = await app.inject({ method: "GET", url: "/custom" });
		const body = JSON.parse(response.payload);

		expect(response.statusCode).toBe(403);
		expect(body.status).toBe("error");
		expect(body.code).toBe(403);
		expect(body.error).toBe("Error");
		expect(body.message).toBe("Forbidden");
	});

	it("should default to 500 for generic errors", async () => {
		app.get("/generic", async () => {
			throw new Error("Unexpected");
		});

		const response = await app.inject({ method: "GET", url: "/generic" });
		const body = JSON.parse(response.payload);

		expect(response.statusCode).toBe(500);
		expect(body.code).toBe(500);
		expect(body.message).toBe("Unexpected");
	});
});
