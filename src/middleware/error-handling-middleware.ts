import { logger } from '../utils/logger';
import ResponseUtil from '../utils/response-util';
import ServiceError from '../errors/service-error';
import ErrorCodes from '../errors/error-codes';
import MonitoringHelper from '../utils/monitoring/monitoring-helper';
import UnauthorizedError from '../errors/unauthorized-error';
import ServiceErrorUtil from '../errors/service-error-util';

export default function ErrorHandlingMiddleware(
	error: any,
	request: any,
	res: any,
	next: any,
) {
	MonitoringHelper.publishApiError(error.name || 'unknown');

	logger.error(
		'[ErrorHandlingMiddleware] Error: %s',
		JSON.stringify(error || {}),
	);
	if (error && error.stack) logger.error(error); // Printing Error stack

	if (error instanceof ServiceError) {
		ResponseUtil.sendErrorResponse(res, error);
	} else if (error instanceof UnauthorizedError) {
		ResponseUtil.sendErrorResponse(
			res,
			ServiceErrorUtil.getAuthorizationError(),
		);
	} else {
		ResponseUtil.sendErrorResponse(
			res,
			ServiceErrorUtil.getInternalServerError(),
		);
	}
}
