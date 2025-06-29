# Fastify TypeScript Starter

> A robust and opinionated starter template for building Fastify APIs with TypeScript, powered by Zod, Pino, and more.

---

## Features

-   **Fastify v5** with first-class TypeScript support
-   **Type-safe routes** using `fastify-type-provider-zod`
-   **Zod schemas** for request and response validation
-   **Global error handler** for consistent error responses
-   **Security headers** via `@fastify/helmet`
-   **Swagger/OpenAPI docs** in development (`@fastify/swagger` & `@fastify/swagger-ui`)
-   **Axios HTTP client** plugin with request/response logging
-   **Structured logging** with Pino
-   **Environment configuration** validated with Zod
-   **Testing** powered by Jest with coverage thresholds
-   **Linting & formatting** with Biome
-   **Docker-ready** configuration

---

## Getting Started

### Prerequisites

-   Node.js v18+ (e.g., 22)
-   npm (or yarn)
-   Docker (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/luisalfredosv/fastify-ts-starter.git
cd fastify-ts-starter

# Install dependencies
npm ci
```

### Environment Variables

Create a `.env` file in the project root with the following values:

```dotenv
SERVER_PORT=3000       # Port to run the server on
SERVER_HOST=0.0.0.0    # Host interface
NODE_ENV=development   # Environment (development|production|test)
LOG_LEVEL=debug        # Log level for Pino
```

The environment schema and defaults are defined in [`src/config/envs.ts`](src/config/envs.ts).

---

## Scripts

| Command          | Description                                      |
| ---------------- | ------------------------------------------------ |
| `npm run dev`    | Start server in development mode with hot reload |
| `npm run build`  | Compile TypeScript into JavaScript               |
| `npm start`      | Run the compiled production server               |
| `npm test`       | Execute unit and integration tests               |
| `npm run lint`   | Lint and auto-fix source code using Biome        |
| `npm run format` | Format source code using Biome                   |

---

## Usage

### Development

```bash
npm run dev
```

-   Server will start on `http://localhost:<SERVER_PORT>`
-   Swagger UI available at `http://localhost:<SERVER_PORT>/docs`

### Production

```bash
npm run build
npm start
```

---

## Docker

Build and run the Docker image:

```bash
docker build -t fastify-ts-starter .
docker run -p 3000:3000 fastify-ts-starter
```

Server will be available on `http://localhost:3000`.

---

## Project Structure

```
.
├── src
│   ├── app.ts               # Fastify server setup
│   ├── config               # Env, logger, error handler, docs, helmet, http-client
│   └── modules              # Feature modules (healthcheck, example)
│       ├── example
│       └── healthcheck
├── tests                   # Integration tests
├── Dockerfile              # Docker multi-stage build
├── jest.config.ts          # Jest configuration
├── biome.json              # Biome lint/format config
├── tsconfig.json           # TypeScript compiler options
└── package.json            # Project metadata & scripts
```

---

## Contributing

Contributions are welcome! Please open issues and pull requests for any improvements, bug fixes, or new features.

---

## License

ISC © Luis Sarabia
