import { Router } from 'express';
import { RouterAuth } from './auth.js';

export class Routes {

    constructor() {
        this.routes = Router();
        this.setupRoutes();
    }

    setupRoutes() {

        this.routes.use('/auth', RouterAuth.Create());
        // this.routes.use('/produtos', this.RouterProdutos);
        // this.routes.use('/clientes', this.RouterClientes);  

        return this.routes;

    }
}
