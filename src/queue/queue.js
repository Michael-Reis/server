import Bull from "bull";
import { ControllerWebhook } from "../controller/webhook/index.js";

export class Queues {

  constructor() {
    this.queue = new Bull('webhook', { redis: { port: 6379, host: 'localhost' } });
    this.controller_webhook = new ControllerWebhook();
    this.setupQueueProcessing();
  }

  async setupQueueProcessing() {
    return this.queue.process(async (job) => {
      const { sum } = job.data;
      return await this.controller_webhook.Webhook(sum);
    });
  }
}
