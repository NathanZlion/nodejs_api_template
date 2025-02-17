import { BulkWriteResponse } from "@/domain/entities/commonEntity";
import ITodoRepo from "@/domain/repositories/ITodoRepo";
import { injectable } from "inversify";
import { CreateTodoDTO } from "@/application/dtos/todoDtos";
import { TodoEntity, TodoQuery } from "@/domain/entities/todoEntity";
import { TodoMapper, TodoModel } from "@/data/models/todoModel";
import { NotFoundError } from "@/core/constants/errors";


@injectable()
export class TodoRepoImpl implements ITodoRepo {
    async create(payload: CreateTodoDTO): Promise<TodoEntity> {
        return TodoMapper.toEntity(
            await TodoModel.create(payload)
        );
    }

    async findOne(query: TodoQuery): Promise<TodoEntity> {
        const todo = await TodoModel.findOne(TodoMapper.toQuery(query))

        if (!todo) {
            throw new NotFoundError("Todo not found");
        }

        return TodoMapper.toEntity(todo);
    }

    async findById(id: string): Promise<TodoEntity> {
        const todo = await TodoModel.findById(id)

        if (!todo) {
            throw new NotFoundError("Todo not found");
        }

        return TodoMapper.toEntity(todo);
    }

    async findMany(query: TodoQuery): Promise<TodoEntity[]> {
        const todos = await TodoModel.find(TodoMapper.toQuery(query))

        if (!todos) {
            throw new NotFoundError("Todo not found");
        }

        return todos.map(TodoMapper.toEntity);
    }

    // returns the updated todo
    async updateOne(id: string, update: Partial<TodoEntity>): Promise<TodoEntity> {
        await TodoModel.updateOne({ _id: id }, { ...update })

        const todo = await TodoModel.findById(id)

        if (!todo) {
            throw new NotFoundError("Todo not found");
        }

        return TodoMapper.toEntity(todo);
    }

    async updateMany(query: TodoQuery, update: Partial<TodoEntity>): Promise<BulkWriteResponse> {
        const {
            modifiedCount,
            matchedCount,
            acknowledged,
        } = await TodoModel.updateMany(TodoMapper.toQuery(query), {
            ...update
        })

        if (!acknowledged) {
            throw new NotFoundError("Todo not found");
        }

        return {
            affectedCount: modifiedCount,
            matchedCount: matchedCount,
        }
    }

    async deleteOne(id: string): Promise<TodoEntity> {
        const todo = await TodoModel.findByIdAndDelete(id)

        if (!todo) {
            throw new NotFoundError("Todo not found");
        }

        return TodoMapper.toEntity(todo);
    }

    async deleteMany(query: TodoQuery): Promise<BulkWriteResponse> {
        const {
            deletedCount,
            acknowledged,
        } = await TodoModel.deleteMany(TodoMapper.toQuery(query))

        if (!acknowledged) {
            throw new NotFoundError("Todo not found");
        }

        return {
            affectedCount: deletedCount,
            matchedCount: deletedCount,
        }
    }

    async count(query: TodoQuery): Promise<number> {
        return await TodoModel.countDocuments(TodoMapper.toQuery(query));
    }
}