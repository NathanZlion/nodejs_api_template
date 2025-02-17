import { Request, Response, NextFunction } from "express";
import { logger } from "@/core/utils/logger";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        logger.info(
            `[${req.method}] ${req.url} | Status: ${res.statusCode} | Duration: ${duration}ms | Body: ${JSON.stringify(req.body)} | Query: ${JSON.stringify(req.query)} | Params: ${JSON.stringify(req.params)}`
        );
    });

    next();
};

export default requestLogger;
