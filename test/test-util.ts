import * as fs from "fs";

export default class TestUtil {
  static getSqlString(path: string): string {
    let sql = fs.readFileSync(__dirname + `/sql/${path}.sql`).toString();
    sql = sql.replace(/(\r\n|\n|\r)/gm, '');
    return sql;
  }
}