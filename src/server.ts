import express, { Express } from "express";
import cors from "cors"
import { createServer } from "http";
import helmet from "helmet";
import config from "./config";
import router from "./application/routes"
import requestLogger from "./application/middlewares/requestLogger";
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./docs/docOptions";


const app: Express = express();

app.use(cors({
    origin: config.ALLOWED_CLIENT_URLS,
    methods: 'GET,POST,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Authorization,Origin,X-Requested-With,Content-Type,Accept',
}));

// Add documentation
const specs = swaggerJsdoc(swaggerOptions);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

// Add logging
app.use(requestLogger)

// add security-related headers
app.use(helmet());

// bind the routes
app.use(router);

export default createServer(app)
