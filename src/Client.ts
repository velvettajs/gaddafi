import Webhook from 'lib/api/Webhook';

export default class Client {
  constructor(
    protected url: string,
    protected key: string
  ) {
    if (!url) throw new Error('Url is required.');
    if (!key) throw new Error('Key is required.');
  }
  getUrl() {
    const webh = new Webhook();
    console.log(webh);
  }
}
