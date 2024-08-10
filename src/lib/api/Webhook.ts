import { db } from 'lib/DatabaseClient';
import { webhooks } from 'lib/models';
import type { WebhookType } from '@velvetta/types';

class Webhook {
  private tag: string = '';
  public async getWebhook(): Promise<any> {
    const webhookList = await db.select().from(webhooks);
    return webhookList[0];
  }
}
export default Webhook;
