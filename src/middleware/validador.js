export class MiddlewareValidador {
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
}
