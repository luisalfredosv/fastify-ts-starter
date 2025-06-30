import helmet from "@fastify/helmet";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export async function helmetConfig(
  server: FastifyInstance,
  _opts: unknown,
): Promise<void> {
  server.register(helmet, { contentSecurityPolicy: false, global: true });
}

export default fp(helmetConfig, { name: "helmet-plugin" });
