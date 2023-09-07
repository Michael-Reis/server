import { Router } from "express";
import { ControllerWebhook } from "../controller/webhook/index.js";
import { Queues } from "../queue/queue.js";

export class RouterWebhook {

    constructor() {
        this.router = Router();
        this.controller = new ControllerWebhook();
        this.queues = new Queues();
    }

    setupRoutes() {

        this.router.post('/comfila', async (req, res) => {
            const webhookQueue = this.queues.queue;
            await webhookQueue.add({ ...req.body });
            res.status(200).send('Webhook enfileirado com sucesso.');
        });

        this.router.post('/semfila', async (req, res) => {
            const { sum } = req.body;
            await this.controller.Webhook(sum);
            res.status(200).send('Webhook sem fila executado com sucesso.');
        })

        return this.router;
    }
}
