import { Router } from 'express';
import { ControllerAuth } from '../controller/auth/index.js';
import { SchemaAuth } from '../validations/auth/index.js';
import { MiddlewareValidador } from '../middleware/validate.js';

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

        this.router.post('/login', this.middleware.Validate(this.schema.Login()), (req, res) => {
            this.controller.Login(req, res);
        })

        this.router.get('/users', this.middleware.AuthValidate(this.schema.Autenticate()), this.middleware.Validate(this.schema.Users()), (req, res) => {
            this.controller.GetUsers(req, res);
        })

        this.router.get("/request/*", (req, res) => {
            console.log(req.params[0])
            res.send("Hello World")
        })

        return this.router;
    }
}
