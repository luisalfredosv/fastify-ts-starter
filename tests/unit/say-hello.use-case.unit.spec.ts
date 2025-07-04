import { sayHelloUseCase } from "@modules/example/v1/use-cases/say-hello.use-case";
describe("sayHelloUseCase", () => {
	it("should return a greeting message and a timestamp", () => {
		const input = { name: "Juan" };
		const result = sayHelloUseCase(input);

		expect(result).toHaveProperty("message", "Hola Juan");
		expect(result).toHaveProperty("timestamp");
		expect(new Date(result.timestamp).toString()).not.toBe("Invalid Date");
	});

	it("should personalize the greeting", () => {
		const input = { name: "Ana" };
		const result = sayHelloUseCase(input);

		expect(result.message).toBe("Hola Ana");
	});
});
