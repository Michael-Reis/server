import express from 'express';
import { Routes } from './router/index.js';

export class Server {
    constructor() {
        this.express = express();
        this.middlewares();
        this.Routes();
    }

    middlewares() {
        this.express.use(express.json());
    }

    Routes() {
        this.router = new Routes();
        this.express.use(this.router.routes);
    }

    listen(port, callback) {
        this.express.listen(port, callback);
    }
}
