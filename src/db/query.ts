import { Connection, Pool } from 'mysql2';
import { PoolConnection } from 'mysql2/promise';

import { logger } from '../utils/logger';

import QueryType from './enums/query-type';

class Query {
	private pool: Pool;

	constructor(pool: Pool) {
		pool.on('acquire', function (connection: Connection) {
			logger.info('[DB] Connection %d acquired', connection.threadId);
		});

		pool.on('connection', function (connection: Connection) {
			logger.info(
				'[DB] connection created setting isolation level and auto-commit',
			);
			connection.query(
				'SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED',
			);
			connection.query('SET autocommit = 1');
		});

		pool.on('release', function (connection: Connection) {
			logger.info('[DB] Connection %d released', connection.threadId);
		});

		pool.on('enqueue', function () {
			logger.info('[DB] Waiting for available connection slot');
		});

		this.pool = pool;
	}

	async executeQuery(query: any, type: QueryType) {
		const [rows] = await this.pool.promise().query(query);
		let result: any = rows;
		switch (type) {
			case QueryType.SELECT:
				break;
			case QueryType.INSERT:
				result = result.insertId;
				break;
			case QueryType.UPDATE:
			case QueryType.DELETE:
				result = result.affectedRows;
				break;
			default:
				break;
		}
		return result;
	}

	public async getConnection(): Promise<PoolConnection> {
		try {
			const conn = await this.pool.promise().getConnection();
			return conn;
		} catch (error) {
			logger.error(
				'DBError:: Unable to get Connection from Pool %s',
				error.message,
			);
			throw error;
		}
	}
}

export default Query;
