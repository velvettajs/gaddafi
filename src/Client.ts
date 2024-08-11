import { Embed } from 'lib/api/Embed';
import Video from 'lib/api/Video';
import Webhook from 'lib/api/Webhook';

export default class Client {
  private hook: Webhook;
  private video: Video;
  constructor() {
    this.hook = new Webhook();
    this.video = new Video();
  }
  async run() {
    const hook = await this.hook.createWebhook();
    const video = await this.video.getVideo();
    if (!video.image) throw new Error('Fetched video has no image');
    const MyEmbed = new Embed(video.url, video.image);
    const embed = MyEmbed.createEmbed();
    hook.send(embed);
  }
}
