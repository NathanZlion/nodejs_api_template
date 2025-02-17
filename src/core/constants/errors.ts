import { STATUS_CODE } from "./responses";


export abstract class BaseError extends Error {
    public abstract statusCode: number;
    public abstract message: string;

    constructor(message: string) {
        super(message);
    }
}


export class NotFoundError extends BaseError {
    public message: string;
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.message = message;
        this.statusCode = STATUS_CODE.NOT_FOUND;
    }
}


export class BadRequestError extends BaseError {
    public message: string;
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.message = message;
        this.statusCode = STATUS_CODE.NOT_FOUND;
    }
}


export class UnauthorizedError extends BaseError {
    public message: string;
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.message = message;
        this.statusCode = STATUS_CODE.UNAUTHORIZED;
    }
}

export class InternalServerError extends BaseError {
    public statusCode: number;
    public message: string;

    constructor(message?: string) {
        const msg = message ?? 'Internal server error';
        super(msg);
        this.statusCode = STATUS_CODE.INTERNAL_SERVER_ERROR;
        this.message = msg;
    }
}

