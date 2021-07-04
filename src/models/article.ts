import ArticleDAO from "../repository/models/article-dao";

export default class Article {
  id: number;
  name: string;
  description: string;
  createdAt: number;
  updatedAt: number;

  constructor(id: number, name: string, description: string, createdAt: number, updatedAt: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static getArticle(dao: ArticleDAO): Article {
    return new Article(dao.id, dao.name, dao.description, dao.created_at, dao.updated_at)
  }
}