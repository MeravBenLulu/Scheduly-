import { config } from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Scheduly API',
      version: '1.0.0',
      description: 'API documentation for Scheduly',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Business: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the business',
            },
            name: {
              type: 'string',
              description: 'The name of the business',
            },
            description: {
              type: 'string',
              description: 'A description of the business',
            },
            email: {
              type: 'string',
              description: 'The email of the business',
            },
            telephone: {
              type: 'string',
              description: 'The telephone number of the business',
            },
            address: {
              type: 'string',
              description: 'The address of the business',
            },
            managerId: {
              type: 'string',
              description: 'Unique identifier for the business manager',
            },
          },
        },
        BusinessResponseDTO: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the business',
            },
            name: {
              type: 'string',
              description: 'The name of the business',
            },
            description: {
              type: 'string',
              description: 'A description of the business',
            },
            email: {
              type: 'string',
              description: 'The email of the business',
            },
            telephone: {
              type: 'string',
              description: 'The telephone number of the business',
            },
            address: {
              type: 'string',
              description: 'The address of the business',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the user',
            },
            name: {
              type: 'string',
              description: 'The name of the user',
            },
            password: {
              type: 'string',
              description: 'A password of the user',
            },
            email: {
              type: 'string',
              description: 'The email of the business',
            },
          },
        },
        UserResponseDTO: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the user',
            },
            name: {
              type: 'string',
              description: 'The name of the user',
            },
            email: {
              type: 'string',
              description: 'The email of the business',
            },
          },
        },
        Service: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the service',
            },
            name: {
              type: 'string',
              description: 'The name of the service',
            },
            description: {
              type: 'string',
              description: 'A description of the service',
            },
            timeInMinutes: {
              type: 'number',
              description: 'haw match time the service is taking',
            },
            businessId: {
              type: 'string',
              description: 'The id of of the business that offer this service',
            },
          },
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./src/controllers/*.ts'],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
