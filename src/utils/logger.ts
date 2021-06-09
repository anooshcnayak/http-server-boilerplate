import * as fs from 'fs';
import {createLogger, format, Logger, transports} from 'winston';
import ClsUtils from './ClsUtils';
import Config, {LoggingConfig} from "../config/config";

const DailyRotateFile = require('winston-daily-rotate-file');

const { printf, errors, splat } = format;

const getContextInfo = (): string => {
	const requestInfo: string = ClsUtils.getRequestInfo();

	return `${requestInfo}`;
};

const logFormat = format.combine(
	errors({ stack: true }),
	format.timestamp({
		format: 'YYYY-MM-DD HH:mm:ss',
	}),
	splat(),
	printf(info => {
		const { level, message, timestamp, stack } = info;
		if (stack) {
			// print log trace
			return `${timestamp} ${level}: ${getContextInfo()} ${stack}`;
		}
		return `${timestamp} ${level}: ${getContextInfo()} ${message}`;
	}),
);

export const logger = getLogger()

function getLogger(): Logger {

	const loggingConfig: LoggingConfig = Config.getLoggingConfig();

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

	return createLogger({
		defaultMeta: { time: new Date().toString().slice(4, 24) },
		format: logFormat,
		level: 'info',
		transports: [matrixTransport, errorTransport],
	});
}

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
