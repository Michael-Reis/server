import Joi from "joi";


export class SchemaAuth {

  Autenticate() {
    return Joi.object({
      uuid: Joi.string().required(),
      token: Joi.string().required(),
    }).messages({
      'string.base': `"{{#label}}" deve ser uma string`,
      'string.empty': `"{{#label}}" não pode estar vazio`,
      'any.required': `"{{#label}}" é um campo obrigatório`,
    })
  }

  Register() {
    return Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      id_permission: Joi.number().integer().required(),
      id_company: Joi.number().integer().required(),
    }).messages({
      'string.base': `"{{#label}}" deve ser uma string`,
      'string.empty': `"{{#label}}" não pode estar vazio`,
      'any.required': `"{{#label}}" é um campo obrigatório`,
      'string.email': `"{{#label}}" deve ser um endereço de email válido`
    });;
  }


  Login() {
    return Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }).messages({
      'string.base': `"{{#label}}" deve ser uma string`,
      'string.empty': `"{{#label}}" não pode estar vazio`,
      'any.required': `"{{#label}}" é um campo obrigatório`,
      'string.email': `"{{#label}}" deve ser um endereço de email válido`
    });
  }

  DeleteUser() {
    return Joi.object({
      ids: Joi.array().items(Joi.string().required()).required()
    }).messages({
      'string.base': `"{{#label}}" deve ser uma string`,
      'string.empty': `"{{#label}}" não pode estar vazio`,
      'any.required': `"{{#label}}" é um campo obrigatório`,
      'number.base': `"{{#label}}" deve ser um número`,
      'number.integer': `"{{#label}}" deve ser um número inteiro`,
    });
  }

  Users() {
    return Joi.object({
      limit: Joi.alternatives()
        .try(
          Joi.number().integer().min(1).max(100).required(),
          Joi.forbidden()
        )
        .optional(),
      offset: Joi.alternatives()
        .try(
          Joi.number().integer().min(0).required(),
          Joi.forbidden()
        )
        .optional(),
    }).messages({
      'string.base': `"{{#label}}" deve ser uma string`,
      'string.empty': `"{{#label}}" não pode estar vazio`,
      'any.required': `"{{#label}}" é um campo obrigatório`,
      'number.base': `"{{#label}}" deve ser um número`,
      'number.integer': `"{{#label}}" deve ser um número inteiro`,
      'number.min': `"{{#label}}" deve ser maior ou igual a {{#limit}}`,
      'number.max': `"{{#label}}" deve ser menor ou igual a {{#limit}}`,
    });
  }


}
