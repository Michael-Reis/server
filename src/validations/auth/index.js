import Joi from "joi";


export class SchemaAuth {


  Register() {
    return Joi.object({
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      senha: Joi.string().min(6).required(),
    });
  }

}
