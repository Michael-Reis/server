import { DataAuth } from "../../data/auth.js";
import jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';

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

        const hash = await bcrypt.hash(senha, 10);
        await this.data.CreateUser(nome, email, hash);
        return { mensagem: "Usuário cadastrado com sucesso!" };
    }


    async Login(userData) {

        try {

            const { email, senha } = userData;
            const userExists = await this.data.GetUserByEmail(email);

            if (userExists.length === 0) {
                throw new Error("Email não cadastrado");
            }

            const user = userExists[0];
            const match = await bcrypt.compare(senha, user.senha);

            if (!match) {
                throw new Error("Senha incorreta");
            }

            const payload = {
                id_usuario: user.id_usuario,
                nome: user.nome
            }

            const token = await this.TokenJWT(payload)
            await this.data.CreateTokenUser(token, user.id_usuario);

            const cookiesOptions = {
                secure: (process.env.COOKIE_SECURE == 'true' ? true : false) || false, // alterar para true em produção
                path: '/',
                httpOnly: true,
            }

            return { token, cookiesOptions: cookiesOptions };

        } catch (error) {   
            throw new Error(error.message);
        }

    }

    async TokenJWT(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET);
    }
}