const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Italiya's Whisker Wonders API Documentation",
      description: `\nExplore the API documentation for Italiya's Whisker Wonders website.\n\n🧰 [Backend GitHub repository](https://github.com/Alexandrbig1/italiya-backend)\n\n\n💅
[Frontend GitHub repository](https://github.com/Alexandrbig1/italiya)\n\n\n🌐
[Visit Italiya's website](https://alexandrbig1.github.io/italiya/)\n\n\n Step into the enchanting world of Italiya: our charismatic orange cat. Indulge in whisker wonders with our curated collection of cat-themed treasures — cozy t-shirts, charming cups, and delightful souvenirs. Embrace feline magic and bring a touch of Italiya's charm into your everyday moments. Explore, shop, and immerse yourself in the joy of cats.
  `,
      version: "1.0.0",
    },

    servers: [
      {
        url: "https://italiya.onrender.com/api",
        description: "Dev Server",
      },
      {
        url: "http://localhost:5000/api",
        description: "Local Dev Server",
      },
    ],
    tags: [
      {
        name: "Auth",
        description: "Authorization endpoints",
      },
      {
        name: "User",
        description: "User endpoints",
      },
    ],
    paths: {
      "/auth/signup": {
        post: {
          tags: ["Auth"],
          summary: "Registers a new user",
          operationId: "SignUp",
          parameters: [],
          requestBody: {
            $ref: "#/components/requestBodies/SignUpRequest",
          },
          responses: {
            201: {
              description: "Successful operation",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/SignUpResponse",
                  },
                },
              },
            },
            400: {
              description: "Bad request (invalid request body)",
              content: {},
            },
            409: {
              description: "Provided email already exists",
              content: {},
            },
            "5XX": {
              description: "(5XX) Internal server error",
              content: {},
            },
          },
        },
      },
      "/auth/signin": {
        post: {
          tags: ["Auth"],
          summary: "Authenticates a user via login credentials",
          operationId: "SignIn",
          parameters: [],
          requestBody: {
            $ref: "#/components/requestBodies/SignInRequest",
          },
          responses: {
            201: {
              description: "Successful operation",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/SignInResponse",
                  },
                },
              },
            },
            400: {
              description: "Bad request (invalid request body)",
              content: {},
            },
            403: {
              description: "Email doesn't exist / Password is wrong",
              content: {},
            },
            "5XX": {
              description: "(5XX) Internal server error",
              content: {},
            },
          },
        },
      },
      "/auth/logout": {
        post: {
          tags: ["Auth"],
          summary: "User logout",
          operationId: "Logout",
          parameters: [
            {
              name: "Authorization",
              in: "header",
              required: true,
              style: "simple",
              explode: false,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            204: {
              description: "Successful operation",
              content: {},
            },
            400: {
              description: "No token provided",
              content: {},
            },
            401: {
              description: "Unauthorized (invalid access token)",
              content: {},
            },
            404: {
              description: "Invalid user / Invalid session",
              content: {},
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      "/users/current": {
        get: {
          tags: ["User"],
          summary: "Information about User",
          operationId: "Information about User",
          parameters: [
            {
              name: "Authorization",
              in: "header",
              required: true,
              schema: {
                type: "string",
                format: "JWT",
              },
              description: "Bearer token for authentication",
            },
          ],
          responses: {
            200: {
              description: "Successful operation",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/CurrentUserResponse",
                  },
                },
              },
            },
            400: {
              description:
                "No token provided / Bad request (invalid request body)",
              content: {},
            },
            401: {
              description: "Unauthorized (invalid access token)",
              content: {},
            },
            404: {
              description: "Invalid user / Invalid session",
              content: {},
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
    },
    components: {
      schemas: {
        SignUp: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              minLength: 2,
              maxLength: 20,
              description: "User's name",
            },
            email: {
              type: "string",
              description: "User's email address",
            },
            password: {
              type: "string",
              minLength: 6,
              maxLength: 20,
              description: "User's password",
            },
          },
          example: {
            name: "Alex Smagin",
            email: "alexsmagin@mail.com",
            password: "password12345",
          },
        },
        SignIn: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              description: "User's email address",
            },
            password: {
              type: "string",
              description: "User's password",
            },
          },
          example: {
            email: "alexsmagin@mail.com",
            password: "password12345",
          },
        },
        Logout: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Logout success message",
            },
          },
          example: {
            message: "Logout Successful: You have been successfully logged out",
          },
        },
        CurrentUser: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "User's ID",
            },
            name: {
              type: "string",
              description: "User's name",
            },
            email: {
              type: "string",
              description: "User's email address",
            },
          },
          example: {
            _id: "1234567890",
            name: "Alex Smagin",
            email: "alexsmagin@mail.com",
          },
        },
        SignUpResponse: {
          type: "object",
          properties: {
            name: {
              type: "string",
              minLength: 2,
              maxLength: 20,
              description: "User's name",
            },
            email: {
              type: "string",
              description: "User's email address",
            },
          },
          example: {
            name: "Alex Smagin",
            email: "alexsmagin@mail.com",
          },
        },
        SignInResponse: {
          type: "object",
          properties: {
            name: {
              type: "string",
              minLength: 2,
              maxLength: 20,
              description: "User's name",
            },
            email: {
              type: "string",
              description: "User's email address",
            },
            token: {
              type: "string",
              description: "User's token",
            },
            refreshToken: {
              type: "string",
              description: "User's refreshToken",
            },
          },
          example: {
            name: "Alex Smagin",
            email: "alexsmagin@mail.com",
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDY4NmI1MTMwMmYyMzY5OWMzZWE2NSIsInNpZCI6IjY1ZDY4NmI1MTMwMmYyMzY5OWMzZWE2NyIsImlhdCI6MTcwODU1ODAwNSwiZXhwIjoxNzA4NjQwODA1fQ.Rf6GVEUh29EyPXTq4ZdbRGwtzJ_Uq8j_V7P0aB-bXlg",
            refreshToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDY4NmI1MTMwMmYyMzY5OWMzZWE2NSIsInNpZCI6IjY1ZDY4NmI1MTMwMmYyMzY5OWMzZWE2NyIsImlhdCI6MTcwODU1ODAwNSwiZXhwIjoxNzA4NjQwODA1fQ.Rf6GVEUh29EyPXTq4ZdbRGwtzJ_Uq8j_V7P0aB-bXlg",
          },
        },
        CurrentUserResponse: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Id",
            },
            name: {
              type: "string",
              minLength: 2,
              maxLength: 20,
              description: "User's name",
            },
            email: {
              type: "string",
              description: "User's email address",
            },
          },
          example: {
            id: "65d686971302f23699c3ea60",
            name: "Alex Smagin",
            email: "alexsmagin@mail.com",
          },
        },
      },
      requestBodies: {
        SignUpRequest: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SignUp",
              },
            },
          },
          required: true,
        },
        SignInRequest: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SignIn",
              },
            },
          },
          required: true,
        },
      },
    },
  },

  apis: ["./routes/api/*.js"],
};

export default swaggerOptions;
