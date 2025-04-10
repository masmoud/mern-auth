import swaggerJsdoc from "swagger-jsdoc";
import { env } from "./env";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MERN Auth API",
      version: "1.0.0",
      description: "Authentication API built with MERN Stack (MongoDB, Express, React, Node.js)",
      contact: {
        name: "Mohamed Amoussa",
        url: "https://amoussamohamed.fr",
        email: "contact@amoussamohamed.fr",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "User's unique identifier",
            },
            name: {
              type: "string",
              description: "User's name",
            },
            email: {
              type: "string",
              format: "email",
              description: "User's email",
            },
            role: {
              type: "string",
              enum: ["user", "admin"],
              description: "User's role",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "User's creation date",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "User's last update date",
            },
          },
        },
        UserUpdate: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "User's name",
            },
            email: {
              type: "string",
              format: "email",
              description: "User's email",
            },
            role: {
              type: "string",
              enum: ["user", "admin"],
              description: "User's role",
            },
          },
        },
        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              description: "User's name",
            },
            email: {
              type: "string",
              format: "email",
              description: "User's email",
            },
            password: {
              type: "string",
              format: "password",
              description: "User's password",
            },
            role: {
              type: "string",
              enum: ["admin", "user"],
              default: "user",
              description: "User's role (optional, default: user)",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "User's email",
            },
            password: {
              type: "string",
              format: "password",
              description: "User's password",
            },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              description: "Indicates if the operation was successful",
            },
            message: {
              type: "string",
              description: "Response message",
            },
            tokens: {
              type: "object",
              properties: {
                accessToken: {
                  type: "string",
                  description: "JWT access token",
                },
                refreshToken: {
                  type: "string",
                  description: "JWT refresh token",
                },
              },
            },
            user: {
              $ref: "#/components/schemas/User",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              description: "Error message",
            },
            timestamp: {
              type: "string",
              format: "date-time",
              description: "Error timestamp",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"], // Paths to files containing JSDoc annotations
};

export const swaggerSpec = swaggerJsdoc(options);
