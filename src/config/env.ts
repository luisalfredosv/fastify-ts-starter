import { isProduction } from "@utils/is-production";
import { configDotenv } from "dotenv";
import { z } from "zod/v4";

configDotenv({ debug: isProduction() ? false : true });

const envSchema = z.object({
  SERVER_PORT: z
    .string()
    .transform((s) => {
      const n = Number(s);
      if (Number.isNaN(n)) throw new Error("SERVER_PORT must be a number");
      return n;
    })
    .refine(
      (n) => n > 0 && n < 65536,
      "SERVER_PORT must be between 1 and 65535",
    ),
  SERVER_HOST: z
    .string()
    .nonempty("SERVER_HOST do not be empty  or null")
    .default("0.0.0.0"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .optional()
    .default("development"),
  LOG_LEVEL: z.string().optional().default("debug"),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("Error en variables de entorno:", z.treeifyError(parsed.error));
  process.exit(1);
}

export const env = parsed.data;
