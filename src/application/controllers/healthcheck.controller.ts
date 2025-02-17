import { inject, injectable } from "inversify";
import { IHealthCheckResponse } from "../dtos/healthCheckResponse";
import { Request, Response } from "express";
import { Types } from "@/di/types";
import { ICacheDataSource } from "@/data/datasources/cache/cacheDatasource";
import { IDBDataSource } from "@/data/datasources/db/dbDatasource";
import EmailService from "@/application/services/Email/emailService";
import { logger } from "@/core/utils/logger";
import { errorToResponse } from "@/core/constants/responses";

@injectable()
export default class HealthCheckController {
    constructor(
        @inject(Types.ICacheDataSource)
        private cacheDataSource: ICacheDataSource,

        @inject(Types.IDBDataSource)
        private dbDataSource: IDBDataSource,

        @inject(Types.EmailService)
        private emailService: EmailService,
    ) {
    }

    healthCheck = async (_request: Request, response: Response<IHealthCheckResponse>) => {
        try {
            const dbStatus = await this.dbDataSource.ping();
            const cacheStatus = await this.cacheDataSource.ping();
            const emailStatus = await this.emailService.ping();
            
            console.log(`Health check status: db=${dbStatus}, cache=${cacheStatus}, email=${emailStatus}`);
            
            return response.status(200).json({
                message: "Server is running",
                success: true,
                payload: {
                    uptime: process.uptime(),
                    database: {
                        status: dbStatus,
                        message: dbStatus ? "" : "Database is not reachable"
                    },
                    cacheService: {
                        status: cacheStatus,
                        message: cacheStatus ? "" : "Cache service is not reachable"
                    },
                    emailService: {
                        status: emailStatus,
                        message: emailStatus ? "" : "Email service is not reachable"
                    },
                }
            });
        } catch (error) {
            const { message, name, statusCode, stack } = errorToResponse(error as Error);
            logger.warning(`Error in Update Todos: ${name} - ${message}`);
            logger.error(stack);

            return response.status(statusCode).json({
                success: false,
                message: message,
            });
        }
    };
}