import { logger } from '../utils/logger';
import DatabaseFactory from '../db/database-factory';
import Article from '../db/models/Article';

export default class ArticleService {
	static async getArticle(requestId: string, articleId: number): Promise<any> {
		logger.info(`[ArticleService] [getArticle] articleId ${articleId}`);

		const article: Article | undefined =
			await DatabaseFactory.getArticleQuery().getArticle(articleId);
		return article;
	}
}
