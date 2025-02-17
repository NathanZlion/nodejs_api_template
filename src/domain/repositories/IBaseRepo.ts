import { BulkWriteResponse } from "@/domain/entities/commonEntity"
import { PaginationParams } from "@/domain/entities/commonEntity"

export default interface IBaseRepo<
    IEntity,
    IUserCreatePayload,
    IQuery,
    IQueryParams = PaginationParams,
    IBulkWriteResponse = BulkWriteResponse
> {
    create(payload: IUserCreatePayload): Promise<IEntity>

    findOne(query: IQuery): Promise<IEntity | null>

    findById(id: string): Promise<IEntity | null>

    findMany(query: IQuery, paginationParams: IQueryParams): Promise<IEntity[]>

    updateOne(id: string, update: Partial<IEntity>): Promise<IEntity | null>

    updateMany(query: IQuery, update: Partial<IEntity>): Promise<IBulkWriteResponse>

    deleteOne(id: string): Promise<IEntity | null>

    deleteMany(Query: IQuery): Promise<IBulkWriteResponse>

    count(Query: IQuery): Promise<number>
}

