const mysql = require('mysql2');

class MysqlUtil {
	public static getSqlFormatQuery(query: any): string {
		return mysql.format(query.query, query.values);
	}

	public static getEscapeValue(value: number): string {
		return mysql.escape(value);
	}
}

export default MysqlUtil;
