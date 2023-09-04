import { DataAuth } from "../data/auth.js";

export class MiddlewareValidador {

    constructor() {
        this.data = new DataAuth();
    }

    Validate = (schema) => {
        return (req, res, next) => {
            const { error } = schema.validate(req.body, { abortEarly: false, language: { key: '{{label}}' } });
            if (error) {
                const errorMessages = error.details.map(detail => detail.message.replace(/"/g, '')); // Remover as aspas duplas
                return res.status(400).json({ error: errorMessages });
            }

            next();
        };
    }

    CookieValidate = (schema) => {
        return (req, res, next) => {

            const { error } = schema.validate(req.cookies, { abortEarly: false, language: { key: '{{label}}' } });

            if (error) {
                console.log(error)
                const errorMessages = error.details.map(detail => detail.message.replace(/"/g, '')); // Remover as aspas duplas
                return res.status(400).json({ error: errorMessages });
            }

            next();
        };
    }

    AuthValidate = () => {

        return async (req, res, next) => {

            const { email, uuid, token } = req.cookies;

            if (email && uuid && token) {

                console.log("validando")

                const user = await this.data.GetUserByEmail(email);


                if (user.length > 0 && user[0].uuid === uuid && user[0].token === token) {
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
