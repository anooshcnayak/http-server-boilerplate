import { v4 as uuid } from 'uuid';
import ClsUtil from '../utils/cls-util';
import RequestUtil from '../utils/request-util';

function ClsMiddleware(request: any, res: any, next: any): void {
	ClsUtil.getNS()?.run(() => {
		const requestId: string = RequestUtil.getRequestIdFromHeader(
			request.headers,
		);

		if (requestId) {
			ClsUtil.addRequestIdToRequestNS(requestId);
		} else ClsUtil.addRequestIdToRequestNS(uuid());

		request.reqId = ClsUtil.getRequestInfo();
		return next();
	});
}

export default ClsMiddleware;
