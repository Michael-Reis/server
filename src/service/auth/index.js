import { DataAuth } from "../../data/auth.js";
import { randomUUID } from "crypto";




export class ServiceAuth {


    constructor() {
        this.data = new DataAuth();
    }

    async Register(userData) {

        const { email, nome, senha } = userData;
        const userExists = await this.data.GetUserByEmail(email);
        
        if (userExists.length > 0) {
            throw new Error("Email já cadastrado");
        }

        await this.data.CreateUser(nome, email, senha);
        return { mensagem: "Usuário cadastrado com sucesso!" };
    }
}