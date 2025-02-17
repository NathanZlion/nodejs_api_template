export const swaggerOptions = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Node Api Server Templte Express Swagger API",
            version: "0.0.1",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Nathnael Dereje",
                url: "https://nathnael-dereje.vercel.app/",
                email: "nathandere1357@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./*.ts"],
};