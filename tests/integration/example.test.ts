import { buildServer } from '../../src/app';
import type { fastify } from 'fastify';

describe('POST /api/v1/example', () => {
  let app: ReturnType<typeof fastify>;

  beforeAll(async () => {
    app = buildServer();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('debe responder 200 con message y timestamp', async () => {
    const resp = await app.inject({
      method: 'POST',
      url: '/api/v1/example',
      payload: { name: 'Luis' },
    });

    expect(resp.statusCode).toBe(200);
    const body = JSON.parse(resp.payload);
    expect(body).toHaveProperty('message', 'Hola Luis');
    expect(body).toHaveProperty('timestamp'); 
    expect(new Date(body.timestamp).toISOString()).toBe(body.timestamp);
  });

  it('debe responder 400 si el nombre es muy corto', async () => {
    const resp = await app.inject({
      method: 'POST',
      url: '/api/v1/example',
      payload: { name: 'Lu' },
    });

    expect(resp.statusCode).toBe(400);
    const body = JSON.parse(resp.payload);
    expect(body).toHaveProperty('error');
    expect(body).toHaveProperty('message');
  });
});
