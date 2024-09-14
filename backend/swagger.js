const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Beit Almonah",
            version: "1.0.0",
            description: "ESACodingLab Mern Stack Project",
        },
        servers: [
            {
                url: "http://localhost:5000/api",
                description: "Development server (BackEnd)",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
