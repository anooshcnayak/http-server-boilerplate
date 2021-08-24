import DatabaseService from './database-service';
import QueryType from './enums/query-type';
import DatabaseLatencyDecorator from '../utils/monitoring/database-latency-decorator';
import ArticleDAO from './models/article-dao';
import MysqlUtil from './mysql-util';
import TableNames from './enums/table-names';
import EventDAO from "../../../andromeda/src/db/models/event-dao";
import EventState from "../../../andromeda/src/models/enums/event-state";
import PgUtil from "../../../andromeda/src/db/pg-util";

class ArticleRepository {
	private readonly tableName: string;
	private readonly articleFields: string[];

	constructor(tableName: string) {
		this.tableName = tableName;
		this.articleFields = [
			'id',
			'name',
			'description',
			'updated_at',
			'created_at',
		].map(value => `${this.tableName}.${value}`);
	}

	@DatabaseLatencyDecorator
	public async getArticle(articleId: number): Promise<ArticleDAO | undefined> {
		const query = {
			query: `select ${this.articleFields} from ${this.tableName} where id = ?`,
			values: [articleId],
		};
		const articles: ArticleDAO[] =
			await DatabaseService.getInstance().executeQuery(
				MysqlUtil.getSqlFormatQuery(query),
				QueryType.SELECT,
			);

		return articles.length > 0 ? articles[0] : undefined;
	}

	@DatabaseLatencyDecorator
	public async create(dao: ArticleDAO): Promise<number> {
		const query = {
			query: `insert into ${this.tableName} set ?`,
			values: dao,
		};
		const articleId: number = await DatabaseService.getInstance().executeQuery(
				MysqlUtil.getSqlFormatQuery(query),
				QueryType.INSERT,
		);
		return articleId;
	}
}

export default new ArticleRepository(TableNames.ARTICLE);
