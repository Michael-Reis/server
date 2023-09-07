import { ServiceWebhook } from "../../service/webhook/index.js";
export class ControllerWebhook {

    constructor() {
        this.service = new ServiceWebhook();
    }

    async Webhook(sum) {
        return await this.service.Webhook(sum);
    }

    

}