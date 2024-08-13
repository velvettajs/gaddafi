import { Embed } from 'lib/api/Embed';
import Video from 'lib/api/Video';
import Webhook from 'lib/api/Webhook';
import Payload from 'lib/api/Payload';

export default class Client extends Webhook {
  private video: Video;

  constructor() {
    super();
    this.video = new Video();
  }

  async run(): Promise<void> {
    await this.getWebhook();
    if (!this.webhook) throw new Error('No webhook available');
    const video = await this.video.getVideo(this.webhook.tag);
    if (!video.image || !video.preview) return this.run();

    const embed = new Embed(video.preview, video.image);
    const { embed: embeds, files } = await embed.createEmbed();
    const payload = new Payload(embeds, files);

    try {
      await this.send(payload);
    } catch (e) {
      if (e instanceof Error) {
        if (e.message.includes('Unknown Webhook')) return await this.deleteWebhook();
        console.log(e);
        throw e;
      } else {
        throw new Error('Unexpected non-error object thrown');
      }
    }
  }
}
