import config from "@/config";
import { injectable } from "inversify";
import { RedisClientType, createClient } from "redis";
import { IDataSource } from "@/data/datasources/IDatasource";
import { logger } from "@/core/utils/logger";

export type cacheValueType = string | number | boolean | Buffer | string[] | Record<string, string | number>;


export interface ICacheDataSource extends IDataSource {
  connect(): Promise<boolean>;

  setValue(key: string, value: cacheValueType, ttl?: number | string): Promise<boolean>;

  getValue<T>(key: string): Promise<T | null>;

  deleteValue(key: string): Promise<boolean>;

  getTTL(key: string): Promise<number | null>;
}

@injectable()
export class CacheDataSourceImpl implements ICacheDataSource {
  private readonly client: RedisClientType;

  constructor() {
    this.client = createClient({
      socket: {
        host: config.CACHE_DB_HOST as string,
        port: config.CACHE_DB_PORT as number,
      },
      password: config.CACHE_DB_PASSWORD,
    });
  }

  ping(): Promise<boolean> {
    // TODO: Implement this method
    logger.info("Pinging cache");
    return Promise.resolve(false);
  }

  connect(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        this.client.on("connect", () => {
          resolve(true);
        });

        this.client.on("error", (error) => {
          reject(error);
        });

        await this.client.connect();
      } catch (error) {
        logger.error(`Error in connecting to cache: ${error}`);
        await this.client.disconnect();
        reject(false);
      }
    });
  }

  async setValue(key: string, value: cacheValueType, ttl?: number): Promise<boolean> {
    const data = JSON.stringify(value);
    if (!ttl) {
      return Boolean(await this.client.set(key, data));
    } else {
      return Boolean(await this.client.setEx(key, ttl, data));
    }
  }

  async getValue<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  async deleteValue(key: string): Promise<boolean> {
    const data = await this.client.del(key);
    return data === 1;
  }

  async getTTL(key: string): Promise<number | null> {
    const ttl = await this.client.ttl(key);
    return ttl > 0 ? ttl : null;
  }
}
