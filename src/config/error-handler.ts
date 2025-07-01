import type {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fp from "fastify-plugin";
import { ZodError, type ZodIssue } from "zod";

export default fp(
  async function errorHandler(server: FastifyInstance) {
    server.register(require("@fastify/sensible"));

    server.setErrorHandler(
      (error: unknown, request: FastifyRequest, reply: FastifyReply) => {
        if (error instanceof ZodError) {
          const zodError = error as ZodError;
          const errors = zodError.issues.map((issue: ZodIssue) => ({
            field: issue.path.join(".") || "field",
            message: issue.message || "Invalid value",
          }));
          return reply.status(400).send({ status: "error", code: 400, errors });
        }

        if (
          typeof error === "object" &&
          error !== null &&
          "validation" in error &&
          Array.isArray(
            (
              error as FastifyError & {
                validation?: Array<{
                  message?: string;
                  instancePath?: string;
                }>;
              }
            ).validation,
          )
        ) {
          const errObj = error as FastifyError & {
            validation?: Array<{
              message?: string;
              instancePath?: string;
            }>;
          };
          const errors = errObj.validation!.map((errItem) => ({
            field: (errItem.instancePath ?? "").replace(/^\/+/, "") || "field",
            message: errItem.message ?? "Invalid value",
          }));
          return reply.status(400).send({ status: "error", code: 400, errors });
        }

        server.log.error(
          { err: error, method: request.method, url: request.url },
          "Unhandled error in request",
        );

        const statusCode =
          typeof error === "object" &&
          error !== null &&
          "statusCode" in error &&
          typeof (error as FastifyError).statusCode === "number" &&
          (error as FastifyError).statusCode! >= 400 &&
          (error as FastifyError).statusCode! < 600
            ? (error as FastifyError).statusCode!
            : 500;

        const payload: Record<string, unknown> = {
          status: "error",
          code: statusCode,
          error: (error as Error).name,
          message:
            (error as Error).message ||
            (statusCode === 500 ? "Internal Server Error" : ""),
        };

        if (
          process.env.NODE_ENV !== "production" &&
          error instanceof Error &&
          error.stack
        ) {
          payload.stack = error.stack;
        }

        return reply.status(statusCode).send(payload);
      },
    );
  },
  { name: "errorHandler" },
);
