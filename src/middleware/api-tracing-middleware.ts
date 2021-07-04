import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import MonitoringHelper from '../utils/monitoring/monitoring-helper';

export default function ApiTracingMiddleware(
	request: Request,
	res: Response,
	next: NextFunction,
): void {

	if(request.url && request.url.indexOf("health") != -1) {
		return next()
	}

	const startTime: number = Date.now();

	let apiName = 'unknown';

	try {
		apiName = getApiName(request);
	} catch {
		logger.error('[ApiTracingMiddleware] Error with getting Api Name');
	}

	MonitoringHelper.publishApiOps(apiName);

	logger.info(
		`[Request] [${request.method}] [${request.url}] : %s`,
		JSON.stringify(request.body),
	);
	res.on('finish', () => {
		MonitoringHelper.publishApiLatency(apiName, startTime);
		logger.info(
			`[Response] [${request.method}] [${request.url}] - ${res.statusCode} ${
				res.statusMessage
					//@ts-ignore
			}; ${res.get('Content-Length') || 0}b sent; latency: ${Date.now() - startTime}ms - ${JSON.stringify(res.body || {})}`,
		);
	});

	return next();
}

function getApiName(request: any) {
	let pathSplit = request.path.split('/');

	if (
		request.method &&
		request.method.toLowerCase() === 'get' &&
		pathSplit &&
		pathSplit.length > 0
	) {
		pathSplit.pop();
	}

	pathSplit = pathSplit
		.filter((value: any) => value)
		.map((value: any) => (!isNaN(value) ? 'XXX' : value));

	return `${request.method}-${pathSplit.join('.')}`;
}
