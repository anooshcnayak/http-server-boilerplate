import { validationResult } from 'express-validator';
import ResponseUtil from '../utils/ResponseUtil';
import ServiceErrorUtil from "../errors/service-error-util";

export default function BodyValidationMiddleware(
	req: any,
	res: any,
	next: any,
): void {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		ResponseUtil.sendErrorResponse(
			res,
			ServiceErrorUtil.getBodyValidationError(errors.array())
		);
	} else return next();
}
