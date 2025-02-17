
// Defining the interface for the User Repository, which will be implemented
// the infrastructure layer UserRepo class

import { CreateTodoDTO } from "@/application/dtos/todoDtos";
import { BulkWriteResponse } from "../entities/commonEntity";
import { PaginationParams } from "../entities/userEntity";
import IBaseRepo from "./IBaseRepo";
import { TodoEntity, TodoQuery } from "../entities/todoEntity";


export default interface ITodoRepo extends IBaseRepo<
    TodoEntity,
    CreateTodoDTO,
    TodoQuery,
    PaginationParams,
    BulkWriteResponse
> {
    create(payload: CreateTodoDTO): Promise<TodoEntity>

    findOne(query: TodoQuery): Promise<TodoEntity>

    findById(id: string): Promise<TodoEntity>

    findMany(query: TodoQuery, paginationParams: PaginationParams): Promise<TodoEntity[]>

    updateOne(id: string, update: Partial<TodoEntity>): Promise<TodoEntity>

    updateMany(query: TodoQuery, update: Partial<TodoEntity>): Promise<BulkWriteResponse>

    deleteOne(id: string): Promise<TodoEntity>

    deleteMany(Query: TodoQuery): Promise<BulkWriteResponse>

    count(Query: TodoQuery): Promise<number>
}
