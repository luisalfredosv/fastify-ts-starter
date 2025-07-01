import type { FastifyReply, FastifyRequest } from "fastify";
import { healthCheckController } from "../../src/modules/healthcheck/v1/healthcheck.controller";

describe("healthCheckController", () => {
	it("returns status ok and valid timestamp", async () => {
		const req = {} as FastifyRequest;
		const send = jest.fn();
		const reply = {
			code: jest.fn().mockReturnThis(),
			send,
		} as unknown as FastifyReply;

		await healthCheckController(req, reply);

		expect(reply.code).toHaveBeenCalledWith(200);
		expect(send).toHaveBeenCalledWith(
			expect.objectContaining({
				status: "ok",
				timestamp: expect.any(String),
			})
		);
	});
});
