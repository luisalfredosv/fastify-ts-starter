import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	preset: "ts-jest",
	testEnvironment: "node",
	transform: {
		"^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.json" }],
	},
	testMatch: [
		"<rootDir>/tests/unit/**/*.unit.spec.ts",
		"<rootDir>/tests/integration/**/*.integration.test.ts",
	],
	moduleNameMapper: {
		"^@config/(.*)$": "<rootDir>/src/config/$1",
		"^@modules/(.*)$": "<rootDir>/src/modules/$1",
		"^@utils/(.*)$": "<rootDir>/src/utils/$1",
		"^@app$": "<rootDir>/src/app.ts",
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
	roots: ["<rootDir>/src"],
	transformIgnorePatterns: ["<rootDir>/node_modules/"],
	moduleDirectories: ["node_modules", "src"],
};

export default config;
