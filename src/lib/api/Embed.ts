import { MessageBuilder as MessageEmbed } from 'discord-webhook-node';
import { WebsiteName, WebsiteUrl, WebsiteLogo } from '@config';
export class Embed {
  constructor(
    private url: string,
    private image: string
  ) {
    this.url = url;
    this.image = image;
  }
  private getEmoji(): string {
    const emojis: string[] = ['🍆', '🍑', '💦', '👅', '👌', '👉', '😏', '😈', '🔥', '🖤', '👀'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }
  private getThumbnail(): string {
    const thumbnails: string[] = [];
    return thumbnails[Math.floor(Math.random() * thumbnails.length)];
  }
  public createEmbed(): MessageEmbed {
    const embed = new MessageEmbed()
      .setAuthor(WebsiteName, WebsiteLogo, WebsiteUrl)
      .setTitle('[New Video Uploaded] Go watch it now!')
      .setUrl(this.url)
      .setColor(0xffd49e)
      .setImage(this.image)
      .setThumbnail(this.getThumbnail())
      .addField(`${this.getEmoji()} Watch Full Video`, `[Click here to watch it now](${this.url})`);
    return embed;
  }
}
