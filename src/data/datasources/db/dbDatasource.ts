import config from "@/config";
import { injectable } from "inversify";
import { connect as connectToMongodb } from "mongoose";
import { logger } from "@/core/utils/logger";
import { IDataSource } from "../IDatasource";

export interface IDBDataSource extends IDataSource {
  connect(): Promise<boolean>;
}

@injectable()
export class DBDataSourceImpl implements IDBDataSource {
  ping(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  connect(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      connectToMongodb(config.MONGODB_CONNECTION_STRING)
        .then((connection) => {
          if (connection) {
            logger.info("Connected to MongoDB successfully");
            resolve(true);
          } else {
            logger.warn("Failed to connect to MongoDB");
            resolve(false);
          }
        })
        .catch((error) => {
          logger.error("Error connecting to MongoDB", error);
          resolve(false);
        });
    });
  }
}
