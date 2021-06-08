import DatabaseService from './database-service';
import QueryType from './enums/query-type';
import DBLatencyDecorator from "../utils/monitoring/db-latency-decorator";
import Article from "./models/Article";
import MysqlUtil from "./mysql-util";

export default class ArticleQuery {

  private readonly tableName: string;
  private readonly articleFields: string[];
  
  constructor(tableName: string) {
    this.tableName = tableName;
    this.articleFields = [
      'id',
      'name',
      'description',
      'updated_at',
      'created_at'
    ].map(value => `${this.tableName}.${value}`)
  }

  @DBLatencyDecorator
  public async getArticle(articleId: number): Promise<Article | undefined> {
    const query = {
      query: `select ${this.articleFields} from ${this.tableName} where id = ?`,
      values: [articleId],
    };
    const articles: Article[] = await DatabaseService.getInstance().executeQuery(
      MysqlUtil.getSqlFormatQuery(query),
      QueryType.SELECT,
    );

    return articles.length > 0 ? articles[0] : undefined;
  }
}