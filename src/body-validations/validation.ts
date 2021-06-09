import { query, body, param } from 'express-validator';

export function articleIdValidation(): any {
	return [
		param('articleId')
			.exists()
			.withMessage('articleId does not exists')
			.isInt()
			.withMessage('articleId must be an integer'),
	];
}
