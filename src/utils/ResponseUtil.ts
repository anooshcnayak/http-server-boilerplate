import ServiceError from '../errors/service-error';
const ResponseUtil = (function () {
	return {

		sendSuccessResponse: function (res: any, responseBody: any) {
			res.send({
				status: {
					success: true,
				},
				data: responseBody,
			});
		},

		sendErrorResponse: function (res: any, error: ServiceError) {
			let obj = {
				success: false,
				errorName: error.name,
				errorCode: error.code,
				errorMsg: error.message,
			};
			res.send({
				status: obj,
			});
		},
	};
})();

export default ResponseUtil;
