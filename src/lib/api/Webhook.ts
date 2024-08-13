import { db } from 'lib/DatabaseClient';
import { webhooks, type MSWebhooks } from '@models';
import { sql, eq } from 'drizzle-orm';
import axios, { type AxiosResponse } from 'axios';
import Payload from 'lib/api/Payload';

class Webhook {
  protected webhook: MSWebhooks | null = null;

  protected async getWebhook(): Promise<void> {
    const webhookList: MSWebhooks[] = await db
      .select()
      .from(webhooks)
      .orderBy(sql`RANDOM()`)
      .limit(1);
    this.webhook = webhookList[0];
  }

  protected async send(payload: Payload): Promise<AxiosResponse> {
    const { webhook_url } = this.webhook!;
    const formData = payload.getPayload();
    const response = await axios.post(webhook_url, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    return response;
  }

  protected async deleteWebhook(): Promise<void> {
    if (this.webhook) {
      await db.delete(webhooks).where(eq(webhooks.webhook_url, this.webhook!.webhook_url));
    }
  }
}

export default Webhook;
