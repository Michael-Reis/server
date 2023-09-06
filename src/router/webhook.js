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
        this.router.post('/', async (req, res) => {
            const { email } = req.body;
            const webhookQueue = this.queues.queue;
            await webhookQueue.add({ email });

            res.status(200).send('Webhook enfileirado com sucesso.');
        });


        this.router.post('/semfila', async (req, res) => {
            
            await this.controller.Webhook();
            res.status(200).send('Webhook sem fila executado com sucesso.');
        })

        return this.router;
    }
}
