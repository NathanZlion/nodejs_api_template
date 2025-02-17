import { Router } from "express";
import { container } from "@/di/container";
import { Types } from "@/di/types";
import TodoController from "../controllers/todo.controller";

const todoRouter = Router();

const todoController: TodoController = container.get(Types.TodoController);

todoRouter.post("/", todoController.createTodo);
todoRouter.get("/:id");
todoRouter.get("/");
todoRouter.patch("/:id");
todoRouter.delete("/:id");

export default todoRouter;
