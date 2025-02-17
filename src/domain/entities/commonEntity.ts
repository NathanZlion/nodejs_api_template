
export type BulkWriteResponse = {
    matchedCount: number;
    affectedCount: number;
}

export type PaginationParams = {
    page: number;
    limit: number;
    sort?: object;
};