import { env } from "@config/env";

export function isProduction(): boolean {
  return env.NODE_ENV === "production";
}
