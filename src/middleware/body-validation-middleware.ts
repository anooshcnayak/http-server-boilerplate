import { validationResult } from 'express-validator';
import ResponseUtil from '../utils/ResponseUtil';
import ServiceErrorUtil from '../errors/service-error-util';

export default function BodyValidationMiddleware(
	request: any,
	res: any,
	next: any,
): void {
	const errors = validationResult(request);
	if (!errors.isEmpty()) {
		ResponseUtil.sendErrorResponse(
			res,
			ServiceErrorUtil.getBodyValidationError(errors.array()),
		);
	} else return next();
}
