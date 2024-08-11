import { videos, type MIVideo } from '@models';
import { sql } from 'drizzle-orm';
import { db } from 'lib/DatabaseClient';

export default class Video {
  public async getVideo(): Promise<MIVideo> {
    const video = await db
      .select()
      .from(videos)
      .orderBy(sql`RANDOM()`)
      .limit(1);
    return video[0];
  }
}
