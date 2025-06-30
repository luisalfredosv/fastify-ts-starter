import type {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fp from "fastify-plugin";

export default fp(
  async function errorHandler(server: FastifyInstance) {
    server.setErrorHandler(
      (
        error: FastifyError & {
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
          return reply.status(400).send({ errors });
        }

        server.log.error(
          { err: error, method: request.method, url: request.url },
          "Unhandled error in the request",
        );

        const status =
          error.statusCode && error.statusCode >= 400 && error.statusCode < 600
            ? error.statusCode
            : 500;

        const payload: Record<string, unknown> = {
          error: error.name,
          message: error.message,
        };
        if (process.env.NODE_ENV !== "production") {
          payload.stack = error.stack;
        }

        return reply.status(status).send(payload);
      },
    );
  },
  {
    name: "error-handler",
  },
);
