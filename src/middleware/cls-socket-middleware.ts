import { v4 as uuid } from 'uuid';
import ClsUtils from '../utils/ClsUtils';

function ClsSocketMiddleware(socket: any, next: any, userId?: any): void {
	ClsUtils.getNS()?.run(() => {
		ClsUtils.addRequestIdToRequestNS(uuid());

		if (socket.id) {
			ClsUtils.addSocketIdToRequestNS(socket.id);
		}

		if (socket.userId || socket.handshake.query.userId)
			ClsUtils.addUserIdToRequestNS(
				socket.userId || socket.handshake.query.userId,
			);

		return next();
	});
}

export function ClsSocketSetUserId(userId: any, next: any): void {
	ClsUtils.getNS()?.run(() => {
		ClsUtils.addUserIdToRequestNS(userId);
		return next();
	});
}

export default ClsSocketMiddleware;
