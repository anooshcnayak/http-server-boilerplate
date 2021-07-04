import { v4 as uuid } from 'uuid';
import ClsUtil from '../utils/cls-util';

function ClsSocketMiddleware(socket: any, next: any): void {
	ClsUtil.getNS()?.run(() => {
		ClsUtil.addRequestIdToRequestNS(uuid());

		if (socket.id) {
			ClsUtil.addSocketIdToRequestNS(socket.id);
		}

		if (socket.userId || socket.handshake.query.userId)
			ClsUtil.addUserIdToRequestNS(
				socket.userId || socket.handshake.query.userId,
			);

		return next();
	});
}

export function ClsSocketSetUserId(userId: any, next: any): void {
	ClsUtil.getNS()?.run(() => {
		ClsUtil.addUserIdToRequestNS(userId);
		return next();
	});
}

export default ClsSocketMiddleware;
