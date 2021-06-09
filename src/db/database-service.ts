import mysql, { Pool } from 'mysql2';
import { PoolConnection } from 'mysql2/promise';
import QueryType from './enums/query-type';
import { logger } from '../utils/logger';
import Query from './Query';

import DBError from '../errors/db-error';

// Singleton Class
class DatabaseService {
	private static instance: DatabaseService;
	private pool: Query;

	private constructor(databaseConfig: any) {
		const poolObject: Pool = mysql.createPool(databaseConfig);
		this.pool = new Query(poolObject);
	}

	public static init(databaseConfig: any): void {
		if (!DatabaseService.instance) {
			DatabaseService.instance = new DatabaseService(databaseConfig);
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
		} catch (error) {
			throw new DBError('[DB] ', error);
		}
	}

	public async getConnection(): Promise<PoolConnection> {
		return this.pool.getConnection();
	}
}

export default DatabaseService;
