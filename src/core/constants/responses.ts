import { BaseError } from "./errors"

export const STATUS_CODE = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    EXPIRED: 410,
    INTERNAL_SERVER_ERROR: 500,
}

export const errorToResponse = (
    error: Error
): { name: string, message: string, statusCode: number, stack?: string } => {
    if (error instanceof BaseError) {
        return {
            name: error.name,
            message: error.message,
            statusCode: error.statusCode,
            stack: error.stack
        }
    }


    return {
        name: "Unknown Error",
        message: "Something went wrong",
        statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR,
    }
}