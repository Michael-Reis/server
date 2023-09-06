import { Router } from "express";

export class RouterWebhook {

    constructor() {
        this.router = Router();
    }

    setupRoutes() {
        this.router.post('/webhook', (req, res) => { res.sendStatus(200) })
        return this.router;
    }
}