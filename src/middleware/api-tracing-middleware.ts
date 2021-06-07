import { logger } from '../utils/logger';
import MonitoringHelper from '../utils/monitoring/monitoring-helper';
import {Express} from "express";

function ApiTracingMiddleware(req: any, res: any, next: any): void {
	const startTime: number = Date.now();

	let apiName: string = 'unknown';

	try {
		apiName = getApiName(req);
	} catch (e) {
		logger.error("[ApiTracingMiddleware] Error with getting Api Name");
	}

	MonitoringHelper.publishApiOps(apiName);

	logger.info(
		`[Request] [${req.method}] [${req.url}] : %s`,
		JSON.stringify(req.body),
	);
	res.on('finish', () => {
		MonitoringHelper.publishApiLatency(apiName, startTime);
		logger.info(
			`[Response] [${req.method}] [${req.url}] - ${res.statusCode} ${res.statusMessage}; ${
				res.get('Content-Length') || 0
			}b sent`,
		);
	});

	next();
}

function getApiName(req: any) {
	let pathSplit = req.path.split("/");

	if(req.method && req.method.toLowerCase() === 'get' && pathSplit && pathSplit.length > 0) {
		pathSplit.pop();
	}

	pathSplit = pathSplit.filter((val: any) => val).map((val: any) => !isNaN(val) ? 'XXX' : val);

	return req.method + "-" + pathSplit.join(".");
}

export default ApiTracingMiddleware;
