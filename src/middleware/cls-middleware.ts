import { v4 as uuid } from 'uuid';
import ClsUtils from '../utils/ClsUtils';
import RequestUtil from '../utils/RequestUtil';

function ClsMiddleware(request: any, res: any, next: any): void {
	ClsUtils.getNS()?.run(() => {
		const requestId: string = RequestUtil.getRequestIdFromHeader(
			request.headers,
		);

		if (requestId) {
			ClsUtils.addRequestIdToRequestNS(requestId);
		} else ClsUtils.addRequestIdToRequestNS(uuid());

		request.reqId = ClsUtils.getRequestInfo();
		return next();
	});
}

export default ClsMiddleware;
