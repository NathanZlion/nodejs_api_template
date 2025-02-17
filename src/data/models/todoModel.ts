import { TodoEntity, TodoQuery } from "@/domain/entities/todoEntity";
import { Document, Schema, model } from "mongoose";

export interface ITodoDocument extends Document {
    _id: string,
    title: string,
    description: string,
    isCompleted: boolean,
    createdAt: Date,
    updatedAt: Date,
    isDeleted: boolean,
}

const todoSchema = new Schema<ITodoDocument>(
    {
        title: { type: String, required: true },
        description: { type: String, required: false },
        isCompleted: { type: Boolean, required: true, default: false },
        isDeleted: { type: Boolean, required: true, default: false },
    },
    { timestamps: true }
);

// Add indexes here

export const TodoMapper = {
    toEntity: (doc: ITodoDocument): TodoEntity => {
        return {
            id: doc._id,
            title: doc.title,
            description: doc.description,
            completed: doc.isCompleted,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    },

    toQuery: (query: TodoQuery) => {
        return {
            ...query,
        };
    },
}

export const TodoModel = model<ITodoDocument>("Todo", todoSchema);
