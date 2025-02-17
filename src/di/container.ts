import "reflect-metadata"
import { Container } from "inversify";
import { Types } from "./types";
import TodoController from "@/application/controllers/todo.controller";
import EmailService from "@/application/services/Email/emailService";
import MailTransporter from "@/application/services/Email/mailTransporter";
import ICacheRepo from "@/domain/repositories/ICacheRepo";
import ITodoRepo from "@/domain/repositories/ITodoRepo";
import { TodoRepoImpl } from "@/data/repositories/mongodb/todoRepoImpl";
import { CacheRepoImpl } from "@/data/repositories/redis/cacheRepoImpl";
import { CacheDataSourceImpl, ICacheDataSource } from "@/data/datasources/cache/cacheDatasource";
import { DBDataSourceImpl, IDBDataSource } from "@/data/datasources/db/dbDatasource";
import { CreateTodoUsecase, DeleteTodoUsecase, GetTodosUsecase, GetTodoUsecase, UpdateTodoUsecase } from "@/application/usecases/todoUsecases";


const container = new Container({ defaultScope: "Singleton" });

// Datasources
container.bind<ICacheDataSource>(Types.ICacheDataSource).to(CacheDataSourceImpl);
container.bind<IDBDataSource>(Types.IDBDataSource).to(DBDataSourceImpl);

// Repositories
container.bind<ICacheRepo>(Types.ICacheRepo).to(CacheRepoImpl);
container.bind<ITodoRepo>(Types.ITodoRepo).to(TodoRepoImpl);

// Use cases
container.bind<CreateTodoUsecase>(Types.CreateTodoUsecase).to(CreateTodoUsecase);
container.bind<GetTodoUsecase>(Types.GetTodoUsecase).to(GetTodoUsecase);
container.bind<GetTodosUsecase>(Types.GetTodosUsecase).to(GetTodosUsecase);
container.bind<UpdateTodoUsecase>(Types.UpdateTodoUsecase).to(UpdateTodoUsecase);
container.bind<DeleteTodoUsecase>(Types.DeleteTodoUsecase).to(DeleteTodoUsecase);

// Controllers
container.bind<TodoController>(Types.TodoController).to(TodoController);

// Services
container.bind<EmailService>(Types.EmailService).to(EmailService);
container.bind<MailTransporter>(Types.MailTransporter).to(MailTransporter);


export { container };