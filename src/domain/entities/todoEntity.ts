
/**
 * @swagger
 * components:
 *   schemas:
 *     TodoEntity:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: The title of your book
 *         description:
 *           type: string
 *           description: The description of your book
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         completed:
 *           type: boolean
 *       example:
 *        title: Complete your portfolio website for once
 */
export class TodoEntity {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    completed: boolean;

    constructor({
        id,
        title,
        description,
        createdAt,
        updatedAt,
        completed
    }: {
        id: string;
        title: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        completed: boolean;
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.completed = completed;
    }
}

export class TodoQuery {
    id?: string;
    title?: string;
    description?: string;
    createdAt?: {
        start?: Date;
        end?: Date;
    };
    updatedAt?: {
        start?: Date;
        end?: Date;
    };
    completed?: boolean;
}

