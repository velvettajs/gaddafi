import { db } from 'lib/DatabaseClient';
import { webhooks } from '@models';
import type { WebhookType } from '@velvetta/types';
import { sql } from 'drizzle-orm';
import { Webhook as Hook } from 'discord-webhook-node';
import Girl from 'lib/api/Girl';
class Webhook extends Girl {
  private async getWebhook(): Promise<WebhookType> {
    const webhookList: WebhookType[] = await db
      .select()
      .from(webhooks)
      .orderBy(sql`RANDOM()`)
      .limit(1);
    return webhookList[0];
  }
  public async createWebhook(): Promise<Hook> {
    const { webhook_url } = await this.getWebhook();
    const hook = new Hook(webhook_url);
    const { name, avatar } = await this.getGirl();
    hook.setAvatar(avatar);
    hook.setUsername(name);
    return hook;
  }
}
export default Webhook;
