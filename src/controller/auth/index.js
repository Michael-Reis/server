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


}