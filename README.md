![site/logo.svg](site/logo.svg)

[![codecov](https://codecov.io/gh/jaredwray/tensile/graph/badge.svg?token=iAkdAEwD6S)](https://codecov.io/gh/jaredwray/tensile)
[![tests](https://github.com/jaredwray/tensile/actions/workflows/tests.yaml/badge.svg)](https://github.com/jaredwray/tensile/actions/workflows/tests.yaml)
[![GitHub license](https://img.shields.io/github/license/jaredwray/tensile)](https://github.com/jaredwray/tensile/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dm/tensile)](https://npmjs.com/package/tensile)
[![npm](https://img.shields.io/npm/v/tensile)](https://npmjs.com/package/tensile)

# Fastify Plugin for Modern API Development

Tensile combines caching, api documentation, and hardening into a single library with pre-configured options that just work. 🎉

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

# Rate Limiting

# CORS

# Helmet

# Swagger/OpenAPI

# Metrics

# Contributing and Code of Conduct
Please see [CONTRIBUTING](CONTRIBUTING.md) for details. Please see [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md) for details.


# License
[MIT & © Jared Wray](LICENSE)


