import { Types } from "@/di/types";
import ITodoRepo from "@/domain/repositories/ITodoRepo";
import { inject, injectable } from "inversify";
import { CreateTodoDTO } from "../dtos/todoDtos";
import { TodoEntity, TodoQuery } from "@/domain/entities/todoEntity";
import { PaginationParams } from "@/domain/entities/userEntity";

@injectable()
export class CreateTodoUsecase {
    constructor(
        @inject(Types.ITodoRepo)
        private todoRepo: ITodoRepo
    ) { }

    async execute(dto: CreateTodoDTO): Promise<TodoEntity> {
        const todo = await this.todoRepo.create(dto);
        return todo;
    }
}

@injectable()
export class GetTodoUsecase {
    constructor(
        @inject(Types.ITodoRepo)
        private todoRepo: ITodoRepo
    ) { }

    async execute(id: string): Promise<TodoEntity> {
        const todo = await this.todoRepo.findById(id);
        return todo;
    }
}

@injectable()
export class GetTodosUsecase {
    constructor(
        @inject(Types.ITodoRepo)
        private todoRepo: ITodoRepo
    ) { }

    async execute(query: TodoQuery, pagination: PaginationParams): Promise<TodoEntity[]> {
        const todos = await this.todoRepo.findMany(query, pagination);
        return todos;
    }
}

@injectable()
export class UpdateTodoUsecase {
    constructor(
        @inject(Types.ITodoRepo)
        private todoRepo: ITodoRepo
    ) { }

    async execute(id: string, update: Partial<TodoEntity>): Promise<TodoEntity> {
        const todo = await this.todoRepo.updateOne(id, update);
        return todo;
    }
}

@injectable()
export class DeleteTodoUsecase {
    constructor(
        @inject(Types.ITodoRepo)
        private todoRepo: ITodoRepo
    ) { }

    async execute(id: string): Promise<TodoEntity> {
        const todo = await this.todoRepo.deleteOne(id);
        return todo;
    }
}

