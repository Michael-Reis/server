import { ServiceAuth } from "../../service/auth/index.js";

export class ControllerAuth {

    constructor() {
        this.service = new ServiceAuth();
    }

    async Register(req, res) {

        try {
            const user_data = req.body;
            const new_user = await this.service.Register(user_data);
            return res.status(201).json(new_user);

        } catch (error) {

            const status_error = {
                "Email já cadastrado": 409,
                "Você não tem permissão para cadastrar um usuário com essa permissão": 403,
                "Usuário não encontrado": 404
            }

            const status_code = status_error[error.message] || 500;
            const error_message = status_error[error.message] ? error.message : "Internal Server Error";
            return res.status(status_code).json({ error: error_message });
        }

    }


    async Login(req, res) {
        try {
            const user_data = req.body;
            const token = await this.service.Login(user_data);
            const { uuid, token: token_user } = token;

            res
                .cookie('uuid', uuid, token.cookiesOptions)
                .cookie('token', token_user, token.cookiesOptions);

            return res.status(200).json(token);

        } catch (error) {

            const status_error = {
                "Email não cadastrado": 404,
                "Senha incorreta": 401,
            }

            const status_code = status_error[error.message] || 500;
            const error_message = status_error[error.message] ? error.message : "Internal Server Error";

            return res.status(status_code).json({ error: error_message });
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