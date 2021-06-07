class Constants {
	private static ONE_HOUR_TTL = 3600; // secs
	private static HALF_DAY_TTL = 43200; // secs
	private static ONE_DAY_TTL = 86400; // secs
	private static TWO_DAY_TTL = 2 * 86400; // secs
	private static ONE_MONTH_TTL = 2592000; // secs
	private static SEVEN_DAY_TTL = 604800; // secs

	static CLS = {
		requestNamespaceName: 'request-namespace',
		requestInfoKey: 'requestInfo',
	};

	static REQUEST_HEADERS = {
		REQUEST_ID: 'gk-request-id'
	}
}

export default Constants;
