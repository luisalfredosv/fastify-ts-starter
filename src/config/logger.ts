import { env } from "@config/env";
import pino from "pino";

const isDev = env.NODE_ENV !== "production";
const level = env.LOG_LEVEL || (isDev ? "debug" : "info");

export const logger = pino({
  level,
  timestamp: pino.stdTimeFunctions.isoTime,
  base: undefined,
  formatters: {
    level(label) {
      return { level: label };
    },
  },
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
});
