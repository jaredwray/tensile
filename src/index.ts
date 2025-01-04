import {type CacheableOptions} from 'cacheable';
import pino from 'pino';
import {type FastifyPluginAsync} from 'fastify';
import fastifyRateLimit, {type RateLimitOptions} from '@fastify/rate-limit';
import fastifyCors, {type FastifyCorsOptions} from '@fastify/cors';
import fastifyHelmet, {type FastifyHelmetOptions} from '@fastify/helmet';
import {fastifySwagger, type SwaggerOptions} from '@fastify/swagger';
import ScalarApiReference, {type FastifyApiReferenceOptions} from '@scalar/fastify-api-reference';
import {readPackageUp} from 'read-package-up';

export type TensileOptions = {
	caching?: boolean | CacheableOptions;
	rateLimit?: boolean | RateLimitOptions;
	cors?: boolean | FastifyCorsOptions;
	helment?: boolean | FastifyHelmetOptions;
	logging?: boolean;
	openapi?: boolean;
	apiDocs?: boolean | FastifyApiReferenceOptions;
};

const tensile: FastifyPluginAsync = async (fastify, options: TensileOptions) => {
	if (options?.rateLimit !== false) {
		await (typeof options.rateLimit === 'boolean' ? fastify.register(fastifyRateLimit) : fastify.register(fastifyRateLimit, options.rateLimit!));
	}

	if (options?.cors !== false) {
		await (typeof options.cors === 'boolean' ? fastify.register(fastifyCors) : fastify.register(fastifyCors, options.cors!));
	}

	if (options?.helment !== false) {
		await (typeof options.helment === 'boolean' ? fastify.register(fastifyHelmet) : fastify.register(fastifyHelmet, options.helment!));
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
				},
			},

		});
		fastify.log = logger;
	}

	let title = 'API';
	let version = '0.0.0';
	let description = 'API Documentation';

	if (options?.openapi !== false || options?.apiDocs !== false) {
		const packageInfo = await readPackageUp();
		title = packageInfo?.packageJson.name ?? 'API';
		version = packageInfo?.packageJson.version ?? '0.0.0';
		description = packageInfo?.packageJson.description ?? 'API Documentation';
	}

	if (options?.openapi !== false) {
		// Get package info
		const swaggerOptions: SwaggerOptions = {
			openapi: {
				info: {
					title,
					version,
					description,
				},
			},
		};

		await fastify.register(fastifySwagger, swaggerOptions);
	}

	if (options?.apiDocs !== false) {
		const defaultScalaApiReferenceOptions: FastifyApiReferenceOptions = {
			routePrefix: '/',
			configuration: {
				metaData: {
					title,
					version,
					description,
				},
			},
		};

		const scalarApiReferenceOptions = options.apiDocs ?? defaultScalaApiReferenceOptions;
		console.log(scalarApiReferenceOptions);

		await fastify.register(ScalarApiReference, scalarApiReferenceOptions as FastifyApiReferenceOptions);
	}
};

export default tensile;
