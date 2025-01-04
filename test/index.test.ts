import {it, expect, describe} from 'vitest';
import fastify from 'fastify';
import tensile from '../src/index.js';

describe('tensile', () => {
	it('should initiate the default function', async () => {
		const app = fastify();
		await app.register(tensile);

		const response = await app.inject({
			method: 'GET',
			url: '/openapi.json',
		});

		// Parse the response body
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const body = JSON.parse(response.body);

		// Assertions
		expect(response.statusCode).toBe(200); // Ensure the status code is 200
		expect(body).toHaveProperty('openapi'); // Check if the response contains the `openapi` property
		expect(body).toHaveProperty('info'); // Check if the response contains the `info` property
	});

	it('should show the client html at root', async () => {
		const app = fastify();
		await app.register(tensile);

		const response = await app.inject({
			method: 'GET',
			url: '/',
		});

		// Parse the response body

		const {body} = response;

		// Assertions
		expect(response.statusCode).toBe(200);
		expect(body).toContain('openapi.json');
		expect(body).toContain('title&quot;:&quot;tensile&quot');
	});
});
