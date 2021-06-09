import express from 'express';

import BodyValidationMiddleware from '../middleware/body-validation-middleware';
import { articleIdValidation } from '../body-validations/validation';

const ArticlesRoute = express.Router();
const basePath = '/api/v1/article';

ArticlesRoute.get(
	`/:articleId`,
	articleIdValidation(),
	BodyValidationMiddleware,
);

export default ArticlesRoute;
