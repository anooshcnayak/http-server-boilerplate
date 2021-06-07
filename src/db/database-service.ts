import QueryType from './enums/query-type';
import mysql from 'mysql2';
import { logger } from '../utils/logger';
import Query from './Query';
import { Pool } from 'mysql2';
import { PoolConnection } from 'mysql2/promise';
import DBError from "../errors/db-error";

// Singleton Class
class DatabaseService {
  private static instance: DatabaseService;
  private pool: Query;

  private constructor(dbConfig: any) {
    const poolObj: Pool = mysql.createPool(dbConfig);
    this.pool = new Query(poolObj);
  }

  public static init(dbConfig: any): void {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService(dbConfig);
    }
  }

  public static getInstance(): DatabaseService {
    return DatabaseService.instance;
  }

  public async executeQuery(query: string, queryType: QueryType): Promise<any> {
    try {
      logger.info('[DB] Running query: %s', query);
      const result = await this.pool.executeQuery(query, queryType);
      logger.info('[DB] Query Result: %s', JSON.stringify(result));
      return result;
    } catch (err) {
      throw new DBError('[DB] ', err);
    }
  }

  public async getConnection(): Promise<PoolConnection> {
    return this.pool.getConnection();
  }
}

export default DatabaseService;
