import Joi from "joi";


export class SchemaAuth {


  Register() {
    return Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      id_permission: Joi.number().integer().required(),
      id_company: Joi.number().integer().required(),
      uuid: Joi.string().required()
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

  Users() {
    return Joi.object({
      // email: Joi.string().email().required(),
      uuid: Joi.string().required(),
      token: Joi.string().required(),
    }).messages({
      'string.base': `"{{#label}}" deve ser uma string`,
      'string.empty': `"{{#label}}" não pode estar vazio`,
      'any.required': `"{{#label}}" é um campo obrigatório`,
    })
  }

}
