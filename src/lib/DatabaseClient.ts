import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { Database as Configuration } from '@config';
import type { DatabaseOptions, DbType } from '@velvetta/types';

class DatabaseClient {
  private db: DbType;
  constructor(options: DatabaseOptions) {
    const { dbUri } = options;
    this.db = drizzle(neon(dbUri));
  }
  public getDb(): DbType {
    return this.db;
  }
}
const db = new DatabaseClient(Configuration).getDb();
export { db };
export default DatabaseClient;
