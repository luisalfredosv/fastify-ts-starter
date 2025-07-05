import { config as loadEnv } from "dotenv";
import { z } from "zod/v4";

loadEnv({ debug: process.env.NODE_ENV !== "production", encoding: "utf-8" });

const EnvSchema = z
	.object({
		SERVER_PORT: z.preprocess((val) => {
			const str = z.string().parse(val);
			const num = Number.parseInt(str, 10);
			if (Number.isNaN(num))
				throw new Error("SERVER_PORT must be a valid integer");
			return num;
		}, z.number().int("SERVER_PORT must be an integer").positive("SERVER_PORT must be > 0").max(65535, "SERVER_PORT must be ≤ 65535")),
		SERVER_HOST: z
			.string()
			.nonempty("SERVER_HOST cannot be empty")
			.default("0.0.0.0"),

		SERVER_PREFIX: z
			.string()
			.default("/api")
			.transform((s) => {
				let prefix = s.startsWith("/") ? s : `/${s}`;
				if (!prefix.endsWith("/")) prefix += "/";
				return prefix;
			}),
		SERVER_DOCS_PATH: z
			.string()
			.default("docs")
			.transform((s) => s.replace(/^\/|\/$/g, "")),

		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),

		LOG_LEVEL: z
			.string()
			.nonempty("LOG_LEVEL cannot be empty")
			.default("debug"),
	})
	.transform((cfg) => ({
		...cfg,
		SERVER_DOCS: `${cfg.SERVER_PREFIX}${cfg.SERVER_DOCS_PATH}`,
	}));

const parsed = EnvSchema.safeParse(process.env);
if (!parsed.success) {
	console.error(
		"Environment variable validation failed:",
		z.treeifyError(parsed.error)
	);
	process.exit(1);
}

export const env = parsed.data;
