import { createLogger, format, Logger, transports } from 'winston';
import ClsUtil from './cls-util';
import Config, { LoggingConfig } from '../config/config';

const DailyRotateFile = require('winston-daily-rotate-file');

const { printf, errors, splat, timestamp } = format;

const getContextInfo = (): string => {
	const requestInfo: string = ClsUtil.getRequestInfo();

	return `${requestInfo}`;
};

const logFormat = format.combine(
	errors({ stack: true }),
	timestamp(),
	splat(),
	printf(info => {
		const { level, message, ts, stack } = info;
		if (stack) {
			// print log trace
			return `${ts} [pid-${
				process.pid
			}] ${level}: ${getContextInfo()} ${stack}`;
		}
		return `${ts} [pid-${
			process.pid
		}] ${level}: ${getContextInfo()} ${message}`;
	}),
);

export let logger: Logger;

export default class LoggerUtil {
	static init(loggingConfig: LoggingConfig): void {
		const matrixTransport = new DailyRotateFile({
			datePattern: 'YYYY-MM-DD_HH',
			filename: `logs/${Config.getAppName()}-%DATE%.log`,
			level: loggingConfig.LogLevel,
			maxFiles: loggingConfig.MaxAge,
			maxSize: loggingConfig.MaxSize,
			zippedArchive: false,
		});

		const errorTransport = new DailyRotateFile({
			datePattern: 'YYYY-MM-DD_HH',
			filename: `logs/${Config.getAppName()}-error-%DATE%.log`,
			level: 'error',
			maxFiles: loggingConfig.MaxAge,
			maxSize: loggingConfig.MaxSize,
			zippedArchive: false,
		});

		// matrixTransport.on('rotate', (oldFileName: string) => {
		// 	fs.rename(oldFileName, `${oldFileName}-rotated`, (error: any) => {
		// 		if (error) {
		// 			throw error;
		// 		}
		// 	});
		// });
		//
		// errorTransport.on('rotate', (oldFileName: string, newFileName: string) => {
		// 	fs.rename(oldFileName, `${oldFileName}-rotated`, (error: any) => {
		// 		if (error) {
		// 			throw error;
		// 		}
		// 	});
		// });

		logger = createLogger({
			format: logFormat,
			level: 'info',
			transports: [matrixTransport, errorTransport],
		});

		//
		// If we're not in production then log to the `console` with the format:
		// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
		//
		if (process.env.NODE_ENV !== 'production') {
			logger.add(
				new transports.Console({
					format: logFormat,
				}),
			);
		}
	}
}
