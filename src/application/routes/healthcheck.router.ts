import { Router } from "express"
import { IHealthCheckResponse } from "../dtos/healthCheckResponse";
import { Request, Response } from "express";
import { IBaseReponse } from "../dtos/IBaseReponse";

const healthcheckRouter = Router();


healthcheckRouter.get("/", (_: Request, response: Response<IHealthCheckResponse, IBaseReponse<IHealthCheckResponse>>) => {
    return response.status(200).json({
        success: true,
        message: "Server is running",
        payload: {
            uptime: process.uptime(),
            database: {
                status: true,
                message: ""
            },
            cacheService: {
                status: true,
                message: ""
            },
            emailService: {
                status: true,
                message: ""
            },
        }
    });
})


export default healthcheckRouter;