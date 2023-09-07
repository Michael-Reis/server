import { DataAuth } from "../data/auth.js";

export class MiddlewareValidador {

    constructor() {
        this.data = new DataAuth();
    }

    Validate = (schema) => {
        return (req, res, next) => {
            const { error } = schema.validate(req.body, { abortEarly: false, language: { key: '{{label}}' } });
            if (error) {
                const error_message = error.details.map(detail => detail.message.replace(/"/g, '')); // Remover as aspas duplas
                return res.status(400).json({ error: error_message });
            }
            next();
        };
    }

    CookieValidate = (schema) => {
        return (req, res, next) => {

            const { error } = schema.validate(req.cookies, { abortEarly: false, language: { key: '{{label}}' } });
            if (error) {
                const error_message = error.details.map(detail => detail.message.replace(/"/g, '')); // Remover as aspas duplas
                return res.status(400).json({ error: error_message });
            }
            next();
        };
    }


    AuthValidate = () => {

        return async (req, res, next) => {

            const { uuid, token } = req.cookies;

            if (uuid && token) {

                const [user] = await this.data.getUserByUuid(uuid);

                if (user && user.uuid === uuid && user.token === token) {
                    next();
                } else {
                    return res.status(401).json({ error: "Não autorizado" });
                }

            } else {
                return res.status(401).json({ error: "Não autorizado" });
            }

        };
    }
}
