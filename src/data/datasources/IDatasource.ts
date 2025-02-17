// Common interface for all data sources, wether it's a database, cache, or any other data source

export interface IDataSource {
  connect(): Promise<boolean>;

  ping(): Promise<boolean>;
}
