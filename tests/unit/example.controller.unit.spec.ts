import {
	exampleController,
	ExampleRequest,
} from "../../src/modules/example/v1/example.controller";
import type { FastifyReply } from "fastify";

describe("exampleController", () => {
	it("You must reply with the correct message and timestamp.", async () => {
		const req = { body: { name: "Luis" } } as ExampleRequest;
		const send = jest.fn();
		const reply = {
			code: jest.fn().mockReturnThis(),
			send,
		} as unknown as FastifyReply;

		await exampleController(req, reply);

		expect(reply.code).toHaveBeenCalledWith(200);
		expect(send).toHaveBeenCalledWith(
			expect.objectContaining({
				message: expect.stringContaining("Hola Luis"),
				timestamp: expect.any(String),
			})
		);
	});
});
