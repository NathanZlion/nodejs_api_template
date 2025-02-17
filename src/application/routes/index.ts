import { Request, Response, Router } from "express";
import { IBaseReponse } from "../dtos/IBaseReponse";
import healthcheckRouter from "./healthcheck.router";
import todoRouter from "./todo.router";

const router = Router();

router.use("/todos", todoRouter);
router.use("/status", healthcheckRouter);

// Default route
router.use((_: Request, res: Response<IBaseReponse<null>>) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
})

export default router;