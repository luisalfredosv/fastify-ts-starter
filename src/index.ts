import { buildServer } from "./app";
import { env } from "./config/env";

const server = buildServer();

server.listen(
  { port: env.SERVER_PORT, host: env.SERVER_HOST },
  (err, address) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }

    server.log.info(`Server listening at ${address}`);
  },
);
