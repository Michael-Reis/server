import { Router } from 'express';
import { RouterAuth } from './auth.js';


export class Routes {

    constructor() {
        this.routes = Router();
        this.setupRoutes();
    }

    setupRoutes() {
        
        this.routes.use('/auth', new RouterAuth().setupRoutes());
    }
}
