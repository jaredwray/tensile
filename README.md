# Tensile
Http Mock Library Written in Typescript

Introducing Tesile, a robust platform designed to echo the versatile functionality of httpbin, but with added features that set a new benchmark in testing HTTP requests. Tesile inherits httpbin’s ability to respond to requests with data about the requests themselves, making it invaluable for testing client libraries, web applications, and HTTP sessions.

# WARNING: This is a work in progress and is not ready for use yet. Please use when we hit 1.0.0!

## Features
* Easily Mock any http test scenario
* Httpbin Compatibility Built In
* Self Signed Certificate Generation
* Node and Bun Compatible!
* Use Open API to Generate Mocks
* Easily deploy it to any container environment
* Modern Architecture with ESM and Typescript
* Maintained with Monthly Updates
* Support for HTTP, HTTP2, HTTPS, and WebSockets

## Installation
```bash
npm install tensile
```

## Mock HTTP Test Scenarios
```js
import { Tensile } from 'tensile';
const tensile = new Tensile();
tensile.get('/get', (req, res) => {
  res.json({ message: 'Hello World' });
});
```

## Httpbin Built In
```js
import { Tensile, Httpbin } from 'tensile';
import fetch from 'node:fetch';
const tensile = new Tensile();
tensile.use(Httpbin());

const response = await fetch('http://localhost:3000/get');
const data = await response.json();
console.log(data); // { message: 'Hello World' }
```

## Self Signed Certificate Generation
```js
import { Tensile } from 'tensile';
import fetch from 'node:fetch';
const tensile = new Tensile( { https: true } );

const response = await fetch('https://localhost:3000/get', {
  agent: tensile.agent
});
const data = await response.json();
console.log(data); // { message: 'Hello World' }
```

## Node and Bun Compatible
Because we wanted to enable performance we introduced the ability to use Tensile with Node or Bun. This allows you to use the library in any environment you choose. This also means that we use the http and https libraries that are built into Node and Bun by detecting the environment and using the appropriate library.

```bash
npm install tensile
```
or 
```bash
bun install tensile
```

## Use Open API to Generate Mocks
```js
import { Tensile } from 'tensile';
import fetch from 'node:fetch';
const tensile = new Tensile();
tensile.useOpenAPI('https://api.example.com/openapi.json');
```

## Easily deploy it to any container environment
```bash
docker run -p 3000:3000 jaredwray/tensile
```

If you are looking to run it with httpbin enabled and bundled with the docker image, you can use the following command:
```bash
docker run -p 3000:3000 jaredwray/tensile:with-httpbin
```

## Modern Architecture with ESM and Typescript
```js
import { Tensile } from 'tensile';
const tensile = new Tensile();
tensile.get('/get', (req, res) => {
  res.json({ message: 'Hello World' });
});
```

## Maintained with Monthly Updates
Tensile is maintained with monthly updates and is always up to date with the latest features and security patches.

## Support for HTTP, HTTP2, HTTPS, and WebSockets
Tensile supports HTTP, HTTP2, HTTPS, and WebSockets out of the box. You can easily switch between these protocols by setting the appropriate options in the constructor.

```js
import { Tensile } from 'tensile';
const tensile = new Tensile( { http2: true } );
```

## Contributing and Code of Conduct
Please see [CONTRIBUTING](CONTRIBUTING.md) for details. Please see [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md) for details.


## License
MIT - see [LICENSE](LICENSE) for details


