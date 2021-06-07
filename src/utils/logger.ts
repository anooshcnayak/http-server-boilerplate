import * as fs from 'fs';
import { createLogger, format, transports } from 'winston';
import ClsUtils from "./ClsUtils";
const DailyRotateFile = require('winston-daily-rotate-file');
const { printf, errors, splat } = format;

const getContextInfo = () => {
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

const matrixTransport = new DailyRotateFile({
	datePattern: 'YYYY-MM-DD_HH',
	filename: 'logs/zion-%DATE%.log',
	level: 'debug',
	maxFiles: '5d',
	maxSize: '500m',
	zippedArchive: false,
});

const errorTransport = new DailyRotateFile({
	datePattern: 'YYYY-MM-DD_HH',
	filename: 'logs/zion-error-%DATE%.log',
	level: 'error',
	maxFiles: '5d',
	maxSize: '500m',
	zippedArchive: false,
});

matrixTransport.on('rotate', (oldFileName: string, newFileName: string) => {
	fs.rename(oldFileName, oldFileName + '-rotated', (err: any) => {
		if (err) {
			throw err;
		}
	});
});

errorTransport.on('rotate', (oldFileName: string, newFileName: string) => {
	fs.rename(oldFileName, oldFileName + '-rotated', (err: any) => {
		if (err) {
			throw err;
		}
	});
});

export const logger = createLogger({
	defaultMeta: { time: new Date().toString().slice(4, 24) },
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
