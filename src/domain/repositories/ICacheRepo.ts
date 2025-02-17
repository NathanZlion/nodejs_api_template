import { cacheValueType } from "@/data/datasources/cache/cacheDatasource"

export default interface ICacheRepo {
    setValue(
        key: string,
        value: cacheValueType,
        ttl: number | string,
    ): Promise<boolean>

    getValue<T>(key: string): Promise<T | null>

    deleteValue(key: string): Promise<boolean>
}