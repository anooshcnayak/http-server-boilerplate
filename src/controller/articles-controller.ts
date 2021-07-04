import { NextFunction } from 'express';
import ResponseUtil from '../utils/response-util';
import { logger } from '../utils/logger';
import RequestUtil from '../utils/request-util';
import ArticleService from '../services/article-service';

export default class ArticlesController {
	/*
			GET - /api/v1/article/:articleId    returns article
	 */
	static async getArticle(
		request: any,
		res: any,
		next: NextFunction,
	): Promise<void> {
		const { reqId, params } = request;
		try {
			const articleId: number = RequestUtil.parseQueryParamAsNumber(
				params,
				'articleId',
			);

			const response = await ArticleService.getArticle(reqId, articleId);
			logger.info(
				`[ArticlesController] [getArticle] articleId: ${articleId} Success: %s `,
				JSON.stringify(response),
			);
			ResponseUtil.sendSuccessResponse(res, response);
		} catch (error) {
			next(error);
		}
	}
}
