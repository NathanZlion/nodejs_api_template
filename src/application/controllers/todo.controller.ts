/// A controller for CRUD on TODOs

import { Types } from "@/di/types";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IBaseReponse } from "../dtos/IBaseReponse";
import { CreateTodoDTO } from "@/application/dtos/todoDtos";
import { CreateTodoUsecase, DeleteTodoUsecase, GetTodosUsecase, GetTodoUsecase, UpdateTodoUsecase } from "../usecases/todoUsecases";
import { TodoEntity } from "@/domain/entities/todoEntity";
import { PaginationParams } from "@/domain/entities/commonEntity";
import { errorToResponse } from "@/core/constants/responses";
import { logger } from "@/core/utils/logger";

/**
 * 
 * @swagger
 * tags:
 *  name: Todo
 *  description: Todo operations
 * /todos/:
 *  post:
 *   summary: Create a new todo
 *   tags: [Todo]
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/CreateTodoDTO'
 *   responses:
 *    201:
 *     description: Todo created successfully
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/TodoEntity'
 *    500:
 *     description: Internal Server Error
 * 
 */
@injectable()
export default class TodoController {
  constructor(
    @inject(Types.CreateTodoUsecase)
    private createTodoUsecase: CreateTodoUsecase,

    @inject(Types.GetTodoUsecase)
    private getTodoUsecase: GetTodoUsecase,

    @inject(Types.GetTodosUsecase)
    private getTodosUsecase: GetTodosUsecase,

    @inject(Types.UpdateTodoUsecase)
    private updateTodoUsecase: UpdateTodoUsecase,

    @inject(Types.DeleteTodoUsecase)
    private deleteTodoUsecase: DeleteTodoUsecase,
  ) { }

  createTodo = async (request: Request, response: Response<IBaseReponse<TodoEntity>>) => {
    try {
      const createTodoDto = new CreateTodoDTO(request.body.title, request.body.description);
      const todo = await this.createTodoUsecase.execute(createTodoDto);

      return response.status(201).json({
        success: true,
        message: "Todo created successfully",
        payload: todo,
      });
    } catch (error) {
      const { message, name, statusCode, stack } = errorToResponse(error as Error);
      logger.warning(`Error in Create Todo: ${name} - ${message}`);
      logger.error(stack);

      return response.status(statusCode).json({
        success: false,
        message: message,
      });
    }
  };

  getTodo = async (request: Request, response: Response<IBaseReponse<TodoEntity>>) => {
    try {
      const todo = await this.getTodoUsecase.execute(request.params.id);

      return response.status(200).json({
        success: true,
        message: "Todo fetched successfully",
        payload: todo,
      });
    } catch (error) {
      const { message, name, statusCode, stack } = errorToResponse(error as Error);
      logger.warning(`Error in Get Todo: ${name} - ${message}`);
      logger.error(stack);

      return response.status(statusCode).json({
        success: false,
        message: message,
      });
    }
  };

  getTodos = async (request: Request, response: Response<IBaseReponse<TodoEntity[]>>) => {
    try {
      const pagination: PaginationParams = {
        page: request.query.page ? parseInt(request.query.page.toString()) : 1,
        limit: request.query.limit ? parseInt(request.query.limit.toString()) : 10
      }
      const query = request.query;
      const todos = await this.getTodosUsecase.execute(query, pagination);

      return response.status(200).json({
        success: true,
        message: "Todos fetched successfully",
        payload: todos,
      });
    } catch (error) {
      const { message, name, statusCode, stack } = errorToResponse(error as Error);
      logger.warning(`Error in Get Todos: ${name} - ${message}`);
      logger.error(stack);

      return response.status(statusCode).json({
        success: false,
        message: message,
      });
    }
  };

  updateTodo = async (
    request: Request,
    response: Response<IBaseReponse<TodoEntity>>
  ) => {
    try {
      const todo = await this.updateTodoUsecase.execute(request.params.id, request.body);

      return response.status(200).json({
        success: true,
        message: "Todo updated successfully",
        payload: todo,
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

  deleteTodo = async (
    request: Request,
    response: Response<IBaseReponse<null>>
  ) => {
    try {
      await this.deleteTodoUsecase.execute(request.params.id);

      return response.status(200).json({
        success: true,
        message: "Todo deleted successfully",
      });
    } catch (error) {
      const { message, name, statusCode, stack } = errorToResponse(error as Error);
      logger.warning(`Error in deleteTodo: ${name} - ${message}`);
      logger.error(stack);

      return response.status(statusCode).json({
        success: false,
        message: message,
      });
    }
  };
}
