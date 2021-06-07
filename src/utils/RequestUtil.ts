import Constants from "../constants/constants";

export default class RequestUtil {
	public static parseQueryParamAsNumber(
		params: any,
		paramName: string,
	): number {
		return Number.parseInt(params[paramName] || '0', 10);
	}

	public static parseQueryParamAsString(
		params: any,
		paramName: string,
	): string {
		return params[paramName] || '';
	}

	public static parseQueryParamAsArray(
		params: any,
		paramName: string,
	): string[] {
		return (params[paramName] && params[paramName].split(',')) || [];
	}

	// Filter only number parse values
	public static parseQueryParamAsNumberArray(
		params: any,
		paramName: string,
	): number[] {
		return ((params[paramName] && params[paramName].split(',')) || []).filter(
			(Element: string) => {
				try {
					return parseInt(Element, 10);
				} catch (e) {}
			},
		);
	}

	public static getRequestIdFromHeader(headers: any): string {
		return (
				headers[Constants.REQUEST_HEADERS.REQUEST_ID] ||
				headers[Constants.REQUEST_HEADERS.REQUEST_ID.toUpperCase()] ||
				''
		);
	}
}
