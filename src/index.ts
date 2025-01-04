import { CacheableOptions } from 'cacheable';
import pino from 'pino';
import {FastifyPluginAsync} from 'fastify';
import fastifyRateLimit, { RateLimitOptions } from '@fastify/rate-limit';
import fastifyCors, {FastifyCorsOptions} from '@fastify/cors';
import fastifyHelmet, {FastifyHelmetOptions} from '@fastify/helmet';
import {fastifySwagger} from '@fastify/swagger';
import ScalarApiReference from '@scalar/fastify-api-reference';
import {readPackageUp} from 'read-package-up';


export type TensileOptions = {
	caching?: boolean | CacheableOptions;
	rateLimit?: boolean | RateLimitOptions;
	cors?: boolean | FastifyCorsOptions;
	helment?: boolean | FastifyHelmetOptions;
	logging?: boolean;
	docs?: boolean;
};

const tensile: FastifyPluginAsync = async (fastify, options: TensileOptions) => {

	if (options?.rateLimit !== false) {
		if(typeof options.rateLimit === 'boolean') {
			await fastify.register(fastifyRateLimit);
		} else {
			await fastify.register(fastifyRateLimit, options.rateLimit as RateLimitOptions);
		}
	}

	if (options?.cors !== false) {
		if(typeof options.cors === 'boolean') {
			await fastify.register(fastifyCors);
		} else {
			await fastify.register(fastifyCors, options.cors as FastifyCorsOptions);
		}
	}

	if (options?.helment !== false) {
		if(typeof options.helment === 'boolean') {
			await fastify.register(fastifyHelmet);
		} else {
			await fastify.register(fastifyHelmet, options.helment as FastifyHelmetOptions);
		}
	}

	if (options?.logging !== false) {
		const logger = pino({
			redact: ['req.headers.authorization'],
			transport: {
				target: 'pino-pretty',
				options: {
					colorize: true,
					translateTime: true,
					ignore: 'pid,hostname',
					singleLine: true,
				}
			}
			
		});
		fastify.log = logger;
	}

	if (options?.docs !== false) {

		// Get package info
		const packageInfo = await readPackageUp();
		const title = packageInfo?.packageJson.name ?? 'API';
		const version = packageInfo?.packageJson.version ?? '0.0.0';
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const description = packageInfo?.packageJson.description ?? 'API Documentation';

		const swaggerOptions: any = {
			openapi: {
				info: {
					title,
					version,
					description,
				},
				schemes: ['http'],
				consumes: ['application/json'],
				produces: ['application/json'],
			}
		};

		await fastify.register(fastifySwagger, swaggerOptions);

		fastify.get('/openapi.json', async (request, reply) => {
			return fastify.swagger();
		});

		await fastify.register(ScalarApiReference, {
			routePrefix: '/',
		});
	}
};

export default tensile;
