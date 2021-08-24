import { logger } from '../utils/logger';
import ArticleRepository from '../db/article-repository';
import ArticleDAO from '../db/models/article-dao';
import Article from '../models/article';
import ServiceErrorUtil from "../errors/service-error-util";

export default class ArticleService {
	static async getArticle(
		requestId: string,
		articleId: number,
	): Promise<Article | undefined> {
		logger.info(`[ArticleService] [getArticle] articleId ${articleId}`);

		const articleDao: ArticleDAO | undefined =
			await ArticleRepository.getArticle(articleId);
		return articleDao && Article.getArticle(articleDao);
	}

	static async createArticle(article: Article): Promise<Article | undefined> {
		logger.info(`[ArticleService] [createArticle]`);

		const articleId: number = await ArticleRepository.create(
				Article.getDao(article),
		);
		logger.info(`[ArticleService] [createArticle] Success: ${articleId}`);
		if (articleId) {
			const articleDao: ArticleDAO | undefined = await ArticleRepository.getArticle(
					articleId,
			);
			const article: Article | undefined = articleDao && Article.getArticle(articleDao);

			return article;
		}
		throw ServiceErrorUtil.getDBAnomalyError();
	}
}
