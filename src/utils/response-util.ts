import ServiceError from '../errors/service-error';

export default class ResponseUtil {
	static sendSuccessResponse(res: any, responseBody: any): void {

		res.body = responseBody;
		res.send({
			status: {
				success: true,
			},
			data: responseBody,
		});
	}

	static sendErrorResponse(res: any, error: ServiceError): void {
		const object = {
			success: false,
			errorName: error.name,
			errorCode: error.code,
			errorMsg: error.message,
		};
		res.send({
			status: object,
		});
	}
}
