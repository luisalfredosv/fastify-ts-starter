import fastify from "fastify";
import { ZodError, ZodIssueCode, ZodIssue } from "zod";
import errorHandler from "@config/error-handler";
import {
	serializerCompiler,
	validatorCompiler,
	ZodTypeProvider,
} from "fastify-type-provider-zod";

describe("Error Handler Unit Tests (Zod)", () => {
	let app: ReturnType<typeof fastify>;

	beforeEach(async () => {
		app = fastify().withTypeProvider<ZodTypeProvider>();

		app.setValidatorCompiler(validatorCompiler);
		app.setSerializerCompiler(serializerCompiler);

		await app.register(errorHandler);
	});

	afterEach(async () => {
		await app.close();
	});

	it("should handle custom ZodError and return 400 with array of errors", async () => {
		app.get("/validation-zod", async () => {
			const issue: ZodIssue = {
				code: ZodIssueCode.custom,
				path: ["name"],
				message: "Campo requerido",
			};
			throw new ZodError([issue]);
		});

		await app.ready();

		const res = await app.inject({ method: "GET", url: "/validation-zod" });
		const body = JSON.parse(res.payload);

		expect(res.statusCode).toBe(400);
		expect(body.errors).toEqual([
			{ field: "name", message: "Campo requerido" },
		]);
	});
});
