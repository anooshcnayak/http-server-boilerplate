import ResponseUtil from '../utils/ResponseUtil';
import { logger } from '../utils/logger';
import RequestUtil from '../utils/RequestUtil';
import ArticleService from "../services/article-service";

export default class ArticlesController {
	/*
			GET - /api/v1/article/:articleId    returns article
	 */
	static async getArticle(request: any, res: any, next: any): Promise<void> {
		const { reqId } = request;
		try {
			const articleId: number = RequestUtil.parseQueryParamAsNumber(
					request.params,
					'articleId',
			);

			const response = await ArticleService.getArticle(
				reqId,
				articleId
			);
			logger.info(
				`[ArticlesController] [getArticle] articleId: ${articleId} Success: %s `,
				JSON.stringify(response),
			);
			ResponseUtil.sendSuccessResponse(res, response);
		} catch (e) {
			return next(e);
		}
	}
}