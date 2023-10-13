import { Routes } from './router/index.js';
import dotenv from "dotenv";
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

export class Server {

    constructor() {
        dotenv.config();
        this.express = express();
        this.middlewares();
        this.Routes();
    }

    middlewares() {
        this.express.use(cors({
            origin: 'http://localhost:3000',
            credentials: true
        }));
        this.express.use(cookieParser());
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
        this.express.use(this.router.setupRoutes());
    }

    listen(port, callback) {
        this.express.listen(port, callback);
    }
}
