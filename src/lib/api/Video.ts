import { videos, videoTags, type MIVideo } from '@models';
import { eq, sql } from 'drizzle-orm';
import { db } from 'lib/DatabaseClient';

export default class Video {
  public async getVideo(tag: string): Promise<MIVideo> {
    const videosWithTag = await db
      .select({
        id: videos.id,
        title: videos.title,
        description: videos.description,
        url: videos.url,
        preview: videos.preview,
        image: videos.image,
        duration: videos.duration,
        views: videos.views,
        tagId: videoTags.tagId,
      })
      .from(videos)
      .innerJoin(videoTags, eq(videos.id, videoTags.videoId))
      .where(eq(videoTags.tagId, tag))
      .orderBy(sql`RANDOM()`);
    return videosWithTag[0];
  }
}
