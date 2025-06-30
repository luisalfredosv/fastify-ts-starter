import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	transform: {
		"^.+.tsx?$": ["ts-jest", { tsconfig: "tsconfig.json" }],
	},
	globals: {
		"ts-jest": { tsconfig: "tsconfig.json" },
	},
	testEnvironment: "node",
	testMatch: [
		"<rootDir>/tests/unit/**/*.unit.spec.ts",
		"<rootDir>/tests/integration/**/*.integration.test.ts",
	],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"^@fastify/sensible$": "<rootDir>/jest.setup.ts",
	},
	collectCoverage: true,
	collectCoverageFrom: ["src/**/*.ts", "!src/**/index.ts", "!src/config/**"],
	coverageDirectory: "coverage",
	coverageReporters: ["text", "lcov", "json-summary"],
	coverageThreshold: {
		global: {
			branches: 50,
			functions: 50,
			lines: 85,
			statements: 85,
		},
	},
	cacheDirectory: "<rootDir>/.jest-cache",
	rootDir: ".",
	moduleFileExtensions: ["ts", "js", "json", "node"],
	testEnvironmentOptions: {
		NODE_ENV: "test",
		FASTIFY_LOG_LEVEL: "silent",
	},
};

export default config;
