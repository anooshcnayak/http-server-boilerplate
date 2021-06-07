import ArticleQuery from "./article-query";
import TableNames from "./enums/table-names";

export default class DatabaseFactory {

  private static articleQuery: ArticleQuery;

  public static getArticleQuery(): ArticleQuery {
    if(!this.articleQuery) {
      this.articleQuery = new ArticleQuery(TableNames.ARTICLE);
    }

    return this.articleQuery;
  }
}