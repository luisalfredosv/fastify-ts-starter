import { configDotenv } from "dotenv";
import { z } from "zod/v4";

configDotenv();

const envSchema = z.object({
  SERVER_PORT: z
    .string()
    .transform((s) => {
      const n = Number(s);
      if (Number.isNaN(n)) throw new Error("SERVER_PORT debe ser un número");
      return n;
    })
    .refine((n) => n > 0 && n < 65536, "Puerto fuera de rango"),
  SERVER_HOST: z
    .string()
    .nonempty("SERVER_HOST no puede estar vacío")
    .default("0.0.0.0"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .optional()
    .default("development"),
  LOG_LEVEL: z.string().optional().default("debug"),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("Error en variables de entorno:", parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
