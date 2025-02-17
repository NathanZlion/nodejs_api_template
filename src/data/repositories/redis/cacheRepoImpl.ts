
import { cacheValueType, ICacheDataSource } from "@/data/datasources/cache/cacheDatasource";
import ICacheRepo from "@/domain/repositories/ICacheRepo";
import { Types } from "@/di/types";
import { injectable, inject } from "inversify";


@injectable()
export class CacheRepoImpl implements ICacheRepo {
    constructor(
        @inject(Types.ICacheDataSource)
        private cacheDataSource: ICacheDataSource,
    ) { }

    setValue = (key: string, value: cacheValueType, ttl: number | string): Promise<boolean> => {
        return this.cacheDataSource.setValue(key, value, ttl)
    }

    getValue = <T>(key: string): Promise<T | null> => {
        return this.cacheDataSource.getValue(key)
    }

    deleteValue = (key: string): Promise<boolean> => {
        return this.cacheDataSource.deleteValue(key)
    }
}