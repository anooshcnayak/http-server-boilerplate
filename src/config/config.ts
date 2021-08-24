import dotenv from 'dotenv';
import { env, envBoolean, envNumber } from '../utils/env-util';

let CONF: any;

export interface MonitoringConfig {
	Prefix: string;
	Port: number;
	Endpoint: string;
}

export interface HttpServerConfig {
	Port: string;
}

export interface DBConfig {
	Endpoint: string;
	Port: number;
	Username: string;
	Password: string;
	DatabaseName: string;
	SslMode: string;
	MaxConnection: number;
}

export interface LoggingConfig {
	LogDir: string;
	FileName: string;
	MaxSize: number; // MB
	MaxAge: number; // Days
	LogConsole: boolean;
	LogFile: boolean;
	LogLevel: string;
}

export default class Config {
	static init(): void {
		dotenv.config();
		CONF = {
			APP_NAME: env('APP_NAME'),
			HTTP_SERVER: {
				Port: envNumber('HTTP_SERVER_PORT'),
			},

			MONITORING: {
				Prefix: env('MONITORING_PREFIX'),
				Port: envNumber('MONITORING_PORT'),
				Endpoint: env('MONITORING_ENDPOINT'),
			},

			DATABASE: {},

			LOGGING: {
				LogDir: env('LOGGING_DIR'),
				FileName: env('LOGGING_FILE_NAME'),
				MaxSize: env('LOGGING_FILE_MAX_SIZE'),
				MaxAge: env('LOGGING_FILE_MAX_AGE'),
				LogConsole: envBoolean('LOGGING_CONSOLE'),
				LogFile: env('LOGGING_FILE'),
				LogLevel: env('LOGGING_LEVEL'),
			},
		};
	}

	static getAppName(): string {
		return CONF.appName;
	}

	static getHttpServerConfig(): HttpServerConfig {
		return CONF.HTTP_SERVER;
	}

	static getDBConfig(): DBConfig {
		return CONF.DATABASE;
	}

	static getMonitoringConfig(): MonitoringConfig {
		return CONF.MONITORING;
	}

	static getLoggingConfig(): LoggingConfig {
		return CONF.LOGGING;
	}
}
