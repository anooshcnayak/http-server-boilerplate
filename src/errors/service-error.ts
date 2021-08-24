import { VError } from '@netflix/nerror';
import ErrorCodes from './error-codes';

class ServiceError extends VError {
	// Reducing runtime object allocation of the common errors
	static readonly INTERNAL_SERVER_ERROR = ServiceError.get(
		ErrorCodes.INTERNAL_SERVER_ERROR,
	);
	static readonly AUTHORIZATION_ERROR = ServiceError.get(
		ErrorCodes.AUTHORIZATION_ERROR,
	);

	static readonly ARTICLE_DOES_NOT_EXIST = ServiceError.get(
			ErrorCodes.ARTICLE_DOES_NOT_EXIST,
	);

	static readonly DB_ANOMALY = ServiceError.get(ErrorCodes.DB_ANOMALY);

	constructor(public name: string, public code: number, public message: any) {
		super();
	}

	public static get(errorDetails: ErrorCodes): ServiceError {
		return new ServiceError(
			errorDetails.name,
			errorDetails.code,
			errorDetails.message,
		);
	}
}

export default ServiceError;
