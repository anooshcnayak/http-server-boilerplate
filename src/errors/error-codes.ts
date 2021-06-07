class ErrorCodes {
	static readonly RUNTIME_ERROR = new ErrorCodes(
		10001,
		'Something went wrong',
		'APPLICATION_RUNTIME_ERROR',
	);

	static readonly AUTHORIZATION_ERROR = new ErrorCodes(
		10005,
		'Unauthorized request',
		'UNAUTHORIZED_REQUEST',
	);

	static readonly INTERNAL_SERVER_ERROR = new ErrorCodes(
		10015,
		'Something went wrong..',
		'INTERNAL_SERVER_ERROR',
	);

	static readonly BODY_VALIDATION_ERROR = new ErrorCodes(
			10020,
			'Body validation error',
			'BODY_VALIDATION_ERROR',
	);

	// private to disallow creating other instances of this type
	private constructor(
		public code: number,
		public message: string,
		public name: string,
	) {}
	toString() {
		return this.name;
	}
}

export default ErrorCodes;
