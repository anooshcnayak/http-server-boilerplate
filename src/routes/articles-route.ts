import express from 'express';

import BodyValidationMiddleware from '../middleware/body-validation-middleware';
import { articleIdValidation } from '../body-validations/validation';
import ArticlesController from '../controller/articles-controller';

const ArticlesRoute = express.Router();
const basePath = '/api/v1/article';

ArticlesRoute.get(
	`${basePath}/:articleId`,
	articleIdValidation(),
	BodyValidationMiddleware,
	ArticlesController.getArticle,
);

export default ArticlesRoute;
