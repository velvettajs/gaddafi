import { WebsiteName, WebsiteUrl, WebsiteLogo } from '@config';
import Converter from './Converter';

export class Embed extends Converter {
  constructor(
    url: string,
    private image: string
  ) {
    super(url);
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

  public async createEmbed(): Promise<{ embed: Array<any>; files: Array<string> }> {
    const filePath = await this.optimize();
    const embed = {
      author: {
        name: WebsiteName,
        icon_url: WebsiteLogo,
        url: WebsiteUrl,
      },
      title: '[New Video Uploaded] Go watch it now!',
      color: 0xffd49e,
      image: {
        url: 'attachment://preview.gif',
      },
      thumbnail: {
        url: this.getThumbnail(),
      },
      fields: [
        {
          name: `${this.getEmoji()} Watch Full Video`,
          value: `[Click here to watch it now](${this.url})`,
        },
      ],
    };

    return {
      embed: [embed],
      files: [filePath],
    };
  }
}
