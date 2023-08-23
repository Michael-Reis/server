import express from 'express';
import { Routes } from './router/index.js';
import morgan from 'morgan';

import fs from 'fs';
import path from 'path';


export class Server {
    constructor() {
        this.express = express();
        this.middlewares();
        this.Routes();
    }

    middlewares() {
        this.express.use(express.json());
        this.express.use(morgan('dev'));
        this.express.use(this.errorHandlingMiddleware);

    }

    errorHandlingMiddleware(err, req, res, next) {
        if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
            return res.status(400).json({ mensagem: 'JSON icorreto' });
        }
        next();
    }

    Routes() {
        this.router = new Routes();
        this.express.use(this.router.routes);
    }

    listen(port, callback) {
        this.express.listen(port, callback);
    }
}
