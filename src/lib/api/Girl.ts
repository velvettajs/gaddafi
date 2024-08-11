import { girls } from '@models';
import type { GirlType } from '@velvetta/types';
import { sql } from 'drizzle-orm';
import { db } from 'lib/DatabaseClient';

export default class Girl {
  protected async getGirl(): Promise<GirlType> {
    const girl = await db
      .select()
      .from(girls)
      .orderBy(sql`RANDOM()`)
      .limit(1);
    return girl[0];
  }
}
