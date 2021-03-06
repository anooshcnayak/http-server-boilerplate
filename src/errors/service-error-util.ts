import ErrorCodes from './error-codes';
import ServiceError from './service-error';

class ServiceErrorUtil {
	public static getRuntimeError(): ServiceError {
		return ServiceError.get(ErrorCodes.RUNTIME_ERROR);
	}

	public static getError(error: Error): ServiceError {
		if (!(error instanceof ServiceError)) {
			return this.getRuntimeError();
		}
		return error;
	}

	public static getInternalServerError(): ServiceError {
		return ServiceError.INTERNAL_SERVER_ERROR;
	}

	public static getDBAnomalyError(): ServiceError {
		return ServiceError.DB_ANOMALY;
	}

	public static getBodyValidationError(message: any): ServiceError {
		const error = ServiceError.get(ErrorCodes.BODY_VALIDATION_ERROR);
		error.message = message;
		return error;
	}

	public static getAuthorizationError(): ServiceError {
		return ServiceError.AUTHORIZATION_ERROR;
	}

	public static getArticleDoesNotExist(): ServiceError {
		return ServiceError.ARTICLE_DOES_NOT_EXIST;
	}
}

export default ServiceErrorUtil;
