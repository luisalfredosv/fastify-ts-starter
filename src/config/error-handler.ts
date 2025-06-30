import type {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fp from "fastify-plugin";

export default fp(
  async function errorHandler(server: FastifyInstance) {
    server.register(require("@fastify/sensible"));

    server.setErrorHandler(
      (
        error: FastifyError & {
          statusCode?: number;
          validation?: Array<{
            message?: string;
            instancePath?: string;
          }>;
        },
        request: FastifyRequest,
        reply: FastifyReply,
      ) => {
        if (Array.isArray(error.validation)) {
          const errors = error.validation.map((errItem) => ({
            field: (errItem.instancePath ?? "").replace(/^\/+/, "") || "field",
            message: errItem.message ?? "Invalid value",
          }));
          return reply.status(400).send({ status: "error", code: 400, errors });
        }

        server.log.error(
          { err: error, method: request.method, url: request.url },
          "Unhandled error in request",
        );

        const status =
          error.statusCode && error.statusCode >= 400 && error.statusCode < 600
            ? error.statusCode
            : 500;

        const payload: Record<string, any> = {
          status: "error",
          code: status,
          error: error.name,
          message:
            error.message || (status === 500 ? "Internal Server Error" : ""),
        };

        if (process.env.NODE_ENV !== "production" && error.stack) {
          payload.stack = error.stack;
        }

        return reply.status(status).send(payload);
      },
    );
  },
  { name: "error-handler" },
);
