import ServiceError from '../errors/service-error';

const ResponseUtil = (function () {
	return {
		sendSuccessResponse(res: any, responseBody: any) {
			res.send({
				status: {
					success: true,
				},
				data: responseBody,
			});
		},

		sendErrorResponse(res: any, error: ServiceError) {
			const object = {
				success: false,
				errorName: error.name,
				errorCode: error.code,
				errorMsg: error.message,
			};
			res.send({
				status: object,
			});
		},
	};
})();

export default ResponseUtil;
