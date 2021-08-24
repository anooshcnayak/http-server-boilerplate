class ErrorCodes {
	static readonly RUNTIME_ERROR = new ErrorCodes(
		10_001,
		'Something went wrong',
		'APPLICATION_RUNTIME_ERROR',
	);

	static readonly AUTHORIZATION_ERROR = new ErrorCodes(
		10_005,
		'Unauthorized request',
		'UNAUTHORIZED_REQUEST',
	);

	static readonly INTERNAL_SERVER_ERROR = new ErrorCodes(
		10_015,
		'Something went wrong..',
		'INTERNAL_SERVER_ERROR',
	);

	static readonly BODY_VALIDATION_ERROR = new ErrorCodes(
		10_020,
		'Body validation error',
		'BODY_VALIDATION_ERROR',
	);

	static readonly DB_ANOMALY = new ErrorCodes(
			10_025,
			'Something went wrong..',
			'DB_ANOMALY',
	);

	// Article ERRORS

	static readonly ARTICLE_DOES_NOT_EXIST = new ErrorCodes(
			11_100,
			'Event does not exists',
			'EVENT_DOES_NOT_EXIST',
	);

	// private to disallow creating other instances of this type
	private constructor(
		public code: number,
		public message: string,
		public name: string,
	) {}
	toString(): string {
		return `${this.name}:${this.code}:${this.message}`;
	}
}

export default ErrorCodes;
