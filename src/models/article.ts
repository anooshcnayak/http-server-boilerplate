import ArticleDAO from '../db/models/article-dao';

export default class Article {
	id?: number;
	name?: string;
	description?: string;
	createdAt?: number;
	updatedAt?: number;

	public static getArticle(dao: ArticleDAO): Article {
		const article: Article = new Article();

		if(dao.id) article.id = dao.id;
		if(dao.name) article.name = dao.name;
		if(dao.description) article.description = dao.description;
		if(dao.created_at) article.createdAt = dao.created_at;
		if(dao.updated_at) article.updatedAt = dao.updated_at;
		return article
	}

	public static getDao(article: Article): ArticleDAO {
		const dao: ArticleDAO = {};

		if(article.id) dao.id = article.id;
		if(article.name) dao.name = article.name;
		if(article.description) dao.description = article.description;
		if(article.createdAt) dao.created_at = article.createdAt;
		if(article.updatedAt) dao.updated_at = article.updatedAt;
		return dao;
	}
}
