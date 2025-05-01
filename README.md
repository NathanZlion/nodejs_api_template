# NodeJS API Template

This project is a robust and scalable template for building Node.js APIs using modern tools and best practices. It is designed to accelerate development by providing a pre-configured structure and essential features for common API use cases.

If you find this template useful, consider [forking the repository](https://github.com/your-repo-url/fork) and customizing it to suit your project needs. Contributions are always welcome!

## Features

- **TypeScript**: Strongly typed language for better code quality and maintainability.
- **Express**: Lightweight and flexible web framework for building APIs.
- **Dependency Injection**: Powered by `InversifyJS` for better modularity and testability.
- **MongoDB Integration**: Pre-configured with Mongoose for database operations.
- **Redis Caching**: Built-in support for caching with Redis.
- **Swagger Documentation**: Automatically generated API documentation using Swagger.
- **Logging**: Integrated logging with `Pino` for performance and debugging.
- **Validation**: Input validation using `Joi` for secure and reliable APIs.
- **Error Handling**: Centralized error handling with custom error classes.
- **Environment Configuration**: Managed with `dotenv` for flexibility across environments.
- **Security**: Includes `helmet` and CORS configuration for secure API endpoints.
- **Email Service**: Pre-configured email service using `nodemailer`.
- **Health Checks**: Built-in health check endpoints for monitoring service status.

## Project Structure

The project follows a clean and modular architecture:

```
src/
├── application/       # Application layer (controllers, routes, services, DTOs)
├── core/              # Core utilities, constants, and enums
├── data/              # Data access layer (models, repositories, datasources)
├── di/                # Dependency injection container
├── domain/            # Domain layer (entities, interfaces)
├── docs/              # API documentation configuration
├── [`src/config.ts`](src/config.ts )          # Environment configuration
├── [`src/application/routes/index.ts`](src/application/routes/index.ts )           # Application entry point
├── [`src/server.ts`](src/server.ts )          # Express server setup
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Redis

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd nodejs-api-template
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy the example `.env` file and edit it with your configuration:

   ```bash
   cp .env.example .env
   ```

   Open the `.env` file and update the values as needed. The `.env.example` file contains placeholders for all required environment variables.

### Running the Application

- Start the development server:

  ```bash
  npm run dev
  ```

- Build and run in production:

  ```bash
  npm run prod
  ```

- Seed the database (optional):
  ```bash
  npm run db:seed
  ```

### API Documentation

Access the Swagger documentation at:  
[http://localhost:3000/docs](http://localhost:3000/docs)

### Testing

Run the following command to lint the code:

```bash
npm run lint
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the [Apache License](LICENSE). Enjoy 😊
