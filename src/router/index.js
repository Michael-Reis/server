import { Router } from 'express';
import { RouterAuth } from './auth.js';
import { RouterWebhook } from './webhook.js';

export class Routes {

    constructor() {
        this.routes = Router();
    }

    setupRoutes() {
        this.routes.use('/auth', new RouterAuth().setupRoutes());
        this.routes.use('/webhook', new RouterWebhook().setupRoutes())
        return this.routes;
    }
}
