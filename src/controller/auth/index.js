import { ServiceAuth } from "../../service/auth/index.js";

export class ControllerAuth {

    constructor() {
        this.service = new ServiceAuth();
    }

    async Register(req, res) {

        try {
            const userData = req.body;
            const newUser = await this.service.Register(userData);
            return res.status(201).json(newUser);

        } catch (error) {

            const statusError = {
                "Email já cadastrado": 409,
            }

            const statusCode = statusError[error.message] ? statusError[error.message] : 500;
            return res.status(statusCode).json({ error: error.message });
        }

    }


    async Login(req, res) {
        try {
            const userData = req.body;
            const token = await this.service.Login(userData);

            const { email, uuid, token: tokenUser } = token;

            res
                // .cookie('email', email, token.cookiesOptions)
                .cookie('uuid', uuid, token.cookiesOptions)
                .cookie('token', tokenUser, token.cookiesOptions);

            return res.status(200).json(token);

        } catch (error) {

            const statusError = {
                "Email não cadastrado": 404,
                "Senha incorreta": 401,
            }

            console.log(error.message)
            const statusCode = statusError[error.message] || 500;
            const errorMessage = statusError[error.message] ? error.message : "Internal Server Error";

            return res.status(statusCode).json({ error: errorMessage });
        }
    }

    async GetUsers(req, res) {
        try {

            const { uuid } = req.cookies;
            const users = await this.service.GetUsers(uuid);

            return res.status(200).json(users);
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ error: error.message });
        }
    }

}