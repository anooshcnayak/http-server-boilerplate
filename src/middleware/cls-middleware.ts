import { v4 as uuid } from 'uuid';
import ClsUtils from '../utils/ClsUtils';
import RequestUtil from "../utils/RequestUtil";

function ClsMiddleware(req: any, res: any, next: any): void {
	ClsUtils.getNS()?.run(() => {
		const reqId: string = RequestUtil.getRequestIdFromHeader(req.headers)

		if (reqId) {
			ClsUtils.addRequestIdToRequestNS(reqId);
		} else ClsUtils.addRequestIdToRequestNS(uuid());

		req.reqId = ClsUtils.getRequestInfo();
		return next();
	});
}

export default ClsMiddleware;
