import { getHealthStatusUseCase } from "../../src/modules/healthcheck/v1/use-cases/get-health-status.use-case";
describe("getHealthStatusUseCase", () => {
	it("should return status ok and a valid timestamp", () => {
		const result = getHealthStatusUseCase();

		expect(result).toHaveProperty("status", "ok");
		expect(result).toHaveProperty("timestamp");
		expect(new Date(result.timestamp).toString()).not.toBe("Invalid Date");
	});
});
