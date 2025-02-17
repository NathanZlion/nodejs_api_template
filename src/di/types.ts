/// Types for dependency injection


export const Types = {
    // Data sources
    ICacheDataSource: Symbol.for("ICacheDataSource"),
    IDBDataSource: Symbol.for("IDBDataSource"),

    // Repositories
    IUserRepo: Symbol.for("IUserRepo"),
    IUserCredentialsRepo: Symbol.for("IUserCredentialsRepo"),
    ICacheRepo: Symbol.for("ICacheRepo"),
    ITodoRepo: Symbol.for("ITodoRepo"),

    // Use cases
    CreateTodoUsecase: Symbol.for("CreateTodoUsecase"),
    GetTodoUsecase: Symbol.for("GetTodoUsecase"),
    GetTodosUsecase: Symbol.for("GetTodosUsecase"),
    UpdateTodoUsecase: Symbol.for("UpdateTodoUsecase"),
    DeleteTodoUsecase: Symbol.for("DeleteTodoUsecase"),

    // Controllers
    AuthController: Symbol.for("AuthController"),
    TodoController: Symbol.for("TodoController"),
    UserController: Symbol.for("UserController"),


    // Services
    EmailService: Symbol.for("EmailService"),
    MailTransporter: Symbol.for("MailTransporter"),  // transporter for email service
}