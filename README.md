![site/logo.svg](site/logo.svg)

[![codecov](https://codecov.io/gh/jaredwray/tensile/graph/badge.svg?token=iAkdAEwD6S)](https://codecov.io/gh/jaredwray/tensile)
[![tests](https://github.com/jaredwray/tensile/actions/workflows/tests.yaml/badge.svg)](https://github.com/jaredwray/tensile/actions/workflows/tests.yaml)
[![GitHub license](https://img.shields.io/github/license/jaredwray/tensile)](https://github.com/jaredwray/tensile/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dm/tensile)](https://npmjs.com/package/tensile)
[![npm](https://img.shields.io/npm/v/tensile)](https://npmjs.com/package/tensile)

# Fastify Plugin for Modern API Development

Tensile is a [fastify](https://fastify.org) plugin that enables the standard features you need to build a modern REST api service. 🎉

🚨 WARNING: This is a work in progress and is not ready for use yet. Please use when we hit 1.0.0!

## Features
* Caching: Layer 1 / Layer 2 caching built in via [Cacheable](https://cacheable.org)
* Rate Limiting: Prevent abuse with request rate controls.
* CORS: Enable cross-origin resource sharing for API clients.
* Helmet: Harden API security with HTTP headers.
* Swagger/OpenAPI: Auto-generate API documentation and interactive testing interfaces.
* Metrics: Collect and expose API metrics for monitoring.
* Logging: Preset logging via pino-pretty for easy debugging.
* Maintained on a regular basis!

## Installation
```bash
npm install tensile
```

# Usage
```javascript
import fastify from 'fastify';
import tensile from 'tensile';

const app = fastify();

app.register(tensile, tensileOptions);
```

This will add all the features above with the following pre-configured options:

* Caching: Enabled with a default TTL of 60 seconds.
* Rate Limiting: Enabled with a default limit of 100 requests per minute.
* CORS: Enabled with default options.
* Helmet: Enabled with default options.
* Swagger/OpenAPI: Enabled with default options and a default path of `/`.
* Metrics: Enabled with default options and a default path of `/metrics`.

For more advanced usage you can initialize Tensile with options and then update the options for each feature using the properties:

# Caching

Caching is provided by [Cacheable](https://cacheable.org) and is enabled by default with a TTL of 60 seconds. You can update the options by setting the `cache` property in the `tensileOptions` object:

```javascript
const tensileOptions = {
  cache: {
    ttl: 120
  }
};

app.register(tensile, tensileOptions);
```

if you want to disable caching, you can set the `cache` property to `false`:

```javascript
const tensileOptions = {
  cache: false
};

app.register(tensile, tensileOptions);
```

The options are based on `CachableOptions` from [Cacheable](https://cacheable.org) and are passed directly to the `Cacheable` instance:

```typescript
export type CacheableOptions = {
	/**
	 * The primary store for the cacheable instance
	 */
	primary?: Keyv | KeyvStoreAdapter;
	/**
	 * The secondary store for the cacheable instance
	 */
	secondary?: Keyv | KeyvStoreAdapter;
	/**
	 * Whether to enable statistics for the cacheable instance
	 */
	stats?: boolean;
	/**
	 * Whether the secondary store is non-blocking mode. It is set to false by default.
	 * If it is set to true then the secondary store will not block the primary store.
	 */
	nonBlocking?: boolean;
	/**
	 * The time-to-live for the cacheable instance and will be used as the default value.
	 * can be a number in milliseconds or a human-readable format such as `1s` for 1 second or `1h` for 1 hour
	 * or undefined if there is no time-to-live.
	 */
	ttl?: number | string;
	/**
	 * The namespace for the cacheable instance. It can be a string or a function that returns a string.
	 */
	namespace?: string | (() => string);
};
```

To use the cache in your routes, you can use the `cache` property on the `fastify` instance:

```javascript
import fastify from 'fastify';
import tensile from 'tensile';

const app = fastify();

app.register(tensile);

app.get('/cache-example/:id', async (request, reply) => {
    const { id } = request.params;
    const cacheKey = `cache-example-${id}`;
    
    const cachedValue = app.cache.get(cacheKey);
    
    if (cachedValue) {
        return cachedValue;
    }
    
    const newValue = `New value for ${id}`;
    
    app.cache.set(cacheKey, newValue);
    
    return newValue;
});
```

# Rate Limiting

Rate limiting is based on `@fastify/rate-limit` is enabled by default with the following settings:

* `limit`: 100 requests per minute
* `timeWindow`: 60000 milliseconds (1 minute)

```javascript
const tensileOptions = {
  rateLimit: {
    limit: 200,
    timeWindow: 60000
  }
};
```

You can disable rate limiting by setting the `rateLimit` property to `false`:

```javascript
const tensileOptions = {
  rateLimit: false
};
```

To read more about the options for rate limiting, please see the [@fastify/rate-limit documentation](https://github.com/fastify/fastify-rate-limit?tab=readme-ov-file#options).

# CORS

CORS is based on [@fastify/cors] and enabled by default with the following settings for a public API service:

* `origin`: `*` which allows all origins
* `methods`: GET, POST, PUT, DELETE, OPTIONS, PATCH
* `allowedHeaders`: 'Content-Type', 'Authorization', 'Accept', 'X-Requested-With'
* `exposedHeaders`: 'X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'
* `maxAge`: 86400 which will cache the preflight request for 1 day

Here is an example to set the CORS options:

```javascript
import fastify from 'fastify';
import tensile from 'tensile';

const app = fastify();

const tensileOptions = {
  cors: {
    origin: 'https://example.com',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    }
};

app.register(tensile, tensileOptions);
```

# Helmet

# Swagger/OpenAPI

# Metrics

# Logging

# Contributing and Code of Conduct
Please see [CONTRIBUTING](CONTRIBUTING.md) for details. Please see [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md) for details.


# License
[MIT & © Jared Wray](LICENSE)


