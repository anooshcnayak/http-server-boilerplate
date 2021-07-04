import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import MonitoringHelper from '../utils/monitoring/monitoring-helper';

export default function ApiTracingMiddleware(
	request: Request,
	res: Response,
	next: NextFunction,
): void {
	if (request.url && request.url.includes('health')) {
		// Ignore health checks
		return next();
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
			}; ${res.get('Content-Length') || 0}b sent; latency: ${
				Date.now() - startTime
				// @ts-ignore
			}ms - ${JSON.stringify(res.body || {})}`,
		);
	});

	return next();
}

function getApiName(request: any): string {
	let pathSplit = request.path.split('/');

	pathSplit = pathSplit
		.filter((value: any) => value)
		.map((value: any) => (!Number.isNaN(value) ? 'XXX' : value));

	return `${request.method}-${pathSplit.join('.')}`;
}
