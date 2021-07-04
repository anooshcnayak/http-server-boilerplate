import Constants from '../constants/constants';

export default class RequestUtil {
	public static parseQueryParamAsNumber(
		parameters: any,
		parameterName: string,
	): number {
		return Number.parseInt(parameters[parameterName] || '0', 10);
	}

	public static parseQueryParamAsString(
		parameters: any,
		parameterName: string,
	): string {
		return parameters[parameterName] || '';
	}

	public static parseQueryParamAsArray(
		parameters: any,
		parameterName: string,
	): string[] {
		return (
			(parameters[parameterName] && parameters[parameterName].split(',')) || []
		);
	}

	// Filter only number parse values
	public static parseQueryParamAsNumberArray(
		parameters: any,
		parameterName: string,
	): number[] {
		return (
			(parameters[parameterName] && parameters[parameterName].split(',')) ||
			[]
		).map((element: string) => Number.parseInt(element || '0', 10));
	}

	public static getRequestIdFromHeader(headers: any): string {
		return (
			headers[Constants.REQUEST_HEADERS.REQUEST_ID] ||
			headers[Constants.REQUEST_HEADERS.REQUEST_ID.toUpperCase()] ||
			''
		);
	}
}
