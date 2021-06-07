import { logger } from '../utils/logger';
import ResponseUtil from '../utils/ResponseUtil';
import ServiceError from '../errors/service-error';
import ErrorCodes from '../errors/error-codes';
import MonitoringHelper from '../utils/monitoring/monitoring-helper';
import UnauthorizedError from "../errors/unauthorized-error";
import ServiceErrorUtil from "../errors/service-error-util";

export default function ErrorHandlingMiddleware(
	err: any,
	req: any,
	res: any,
	next: any,
) {

	MonitoringHelper.publishApiError(err.name || 'unknown');

	logger.error('[ErrorHandlingMiddleware] Error: %s', JSON.stringify(err || {}));
	if(err && err.stack) logger.error(err) // Printing Error stack

	if (err instanceof ServiceError) {
		ResponseUtil.sendErrorResponse(res, err);
	} else if (err instanceof UnauthorizedError) {
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
