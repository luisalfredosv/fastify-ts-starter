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
				reply: FastifyReply
			) => {
				// 1) Validaciones de esquema (ajv o fastify-type-provider-zod)
				if (Array.isArray(error.validation)) {
					const grouped: Record<string, string[]> = {};

					for (const errItem of error.validation) {
						const path =
							typeof errItem.instancePath === "string"
								? errItem.instancePath
								: "";
						const field = path.replace(/^\/+/, "") || "field";
						const msg = errItem.message ?? "Invalid value";
						grouped[field] = grouped[field] || [];
						grouped[field].push(msg);
					}

					return reply.status(400).send({ errors: [grouped] });
				}

				// 2) Otros errores: log interno y envío genérico
				server.log.error(
					{ err: error, method: request.method, url: request.url },
					"Unhandled error in the request"
				);

				const status =
					error.statusCode &&
					error.statusCode >= 400 &&
					error.statusCode < 600
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
			}
		);
	},
	{
		name: "error-handler",
	}
);
