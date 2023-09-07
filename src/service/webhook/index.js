
import { DataWebhook } from "../../data/webhook.js"

export class ServiceWebhook {


    constructor() {
        this.data = new DataWebhook();
    }


    async Webhook(sum_payload) {

        try {
            const sum = await this.data.getNumber();
            const new_sum = sum.soma + sum_payload;
            await this.data.updateNumber(new_sum);

        } catch (err) {
            console.log(err);
        }
    }


}