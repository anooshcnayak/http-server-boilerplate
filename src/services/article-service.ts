import { logger } from '../utils/logger';
import ArticleRepository from '../db/article-repository'
import ArticleDAO from "../db/models/article-dao";
import Article from "../models/article";

export default class ArticleService {
	static async getArticle(requestId: string, articleId: number): Promise<Article | undefined> {
		logger.info(`[ArticleService] [getArticle] articleId ${articleId}`);

		const articleDao: ArticleDAO | undefined = await ArticleRepository.getArticle(articleId);
		return articleDao && Article.getArticle(articleDao);
	}
}
