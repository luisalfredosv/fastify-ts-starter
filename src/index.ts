import "tsconfig-paths/register";
import { buildServer } from "@app";
import { env } from "@config/env";

async function startServer() {
	const server = buildServer();

	try {
		const address = await server.listen({
			host: env.SERVER_HOST,
			port: env.SERVER_PORT,
		});
		server.log.info(`Server listen on ${address}`);

		const shutdown = async () => {
			server.log.info("Shutting down server...");
			await server.close();
			process.exit(0);
		};

		process.on("SIGINT", shutdown);
		process.on("SIGTERM", shutdown);
	} catch (err) {
		server.log.error(err as Error, "Error starting server");
		process.exit(1);
	}
}

startServer();
