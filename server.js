'use strict';
const fs = require('fs');
const http = require('http');
const express = require('express');
const swagger = require('swagger-tools');
const jsyaml = require('js-yaml');
const pkg = require('./package.json');
const config = require('./config');

const app = express();

const spec = jsyaml.safeLoad(fs.readFileSync(config.swagger.spec));
swagger.initializeMiddleware(spec, middleware => {

	app.use(middleware.swaggerMetadata());
	app.use(middleware.swaggerValidator(config.swagger.validator));
	app.use(middleware.swaggerRouter(config.swagger.router));
	app.use(middleware.swaggerUi());

	app.listen(config.server.port, () => {
		console.log(`The BassOS backend service is listening on port ${config.server.port} (http://localhost:${config.server.port})`);
		console.log(`Swagger-ui is available on http://localhost:${config.server.port}/docs`);
	});
});



