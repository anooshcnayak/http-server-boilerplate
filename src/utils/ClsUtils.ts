import { Namespace } from 'cls-hooked';
import Constants from '../constants/constants';

class ClsUtils {
	static requestNamespace: Namespace | undefined = undefined;

	static initNS(ns: Namespace): void {
		this.requestNamespace = ns;
	}

	static getNS(): Namespace | undefined {
		return this.requestNamespace;
	}

	static addSocketIdToRequestNS(socketId: string): void {
		const previousValue: string =
			this.requestNamespace?.get(Constants.CLS.requestInfoKey) || '';
		this.requestNamespace?.set(
			Constants.CLS.requestInfoKey,
			`${previousValue} [socketId-${socketId}] `,
		);
	}

	static addRequestIdToRequestNS(requestId: any): void {
		const previousValue: string =
			this.requestNamespace?.get(Constants.CLS.requestInfoKey) || '';
		this.requestNamespace?.set(
			Constants.CLS.requestInfoKey,
			`${previousValue}[${requestId}]`,
		);
	}

	static addUserIdToRequestNS(userId: any): void {
		const previousValue: string =
			this.requestNamespace?.get(Constants.CLS.requestInfoKey) || '';
		this.requestNamespace?.set(
			Constants.CLS.requestInfoKey,
			`${previousValue} [user-${userId}]`,
		);
	}

	static getRequestInfo(): string {
		return this.requestNamespace?.get(Constants.CLS.requestInfoKey) || '';
	}
}

export default ClsUtils;
