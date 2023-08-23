import { Router } from 'express';
import { ControllerAuth } from '../controller/auth/index.js';
import { SchemaAuth } from '../validations/auth/index.js';
import { MiddlewareValidador } from '../middleware/validador.js';

export class RouterAuth {

    constructor() {
        this.router = Router();
        this.controller = new ControllerAuth();
        this.schema = new SchemaAuth();
        this.middleware = new MiddlewareValidador();

    }

    setupRoutes() {
        this.router.post('/register', this.middleware.Validate(this.schema.Register()), (req, res) => {
            this.controller.Register(req, res);
        });

        return this.router;
    }
}
