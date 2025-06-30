import type { AxiosInstance } from "axios";
import axios from "axios";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

import * as config from "./envs";

declare module "fastify" {
  interface FastifyInstance {
    httpClient: AxiosInstance;
  }
}

export async function httpClient(
  server: FastifyInstance,
  _opts: unknown,
): Promise<void> {
  const client = axios.create({
    baseURL: "",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  client.interceptors.request.use((cfg) => {
    server.log.debug({
      msg: "Outgoing Request",
      method: cfg.method,
      url: cfg.url,
    });
    return cfg;
  });

  client.interceptors.response.use(
    (resp) => {
      server.log.debug({
        msg: "Response",
        status: resp.status,
        url: resp.config.url,
      });
      return resp;
    },
    (err) => {
      server.log.error({ msg: "Error Response", error: err.message });
      return Promise.reject(err);
    },
  );

  server.decorate("httpClient", client);
}

export default fp(httpClient, { name: "http-client" });
