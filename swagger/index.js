
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    info: {
        title: 'Training ExpressJs Andres Murgo',
        version: '1.3.0',
        description:
            'Api que expone endpoint de Sign Up .',
    },
    openapi: '3.0.1',
    servers: [
        {
            url: 'http://localhost:8081',
            description: 'Local Server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['swagger/docs/**/specification.yaml'],
};
const swaggerSpec = swaggerJSDoc(options);

module.exports = (path, app) => app.use(path, swaggerUi.serve, swaggerUi.setup(swaggerSpec));