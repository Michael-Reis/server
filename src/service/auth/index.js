import { DataAuth } from "../../data/auth.js";
import jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';
import { randomUUID } from "crypto";


export class ServiceAuth {

    constructor() {
        this.data = new DataAuth();
    }

    async Register(userData) {

        const { email, nome, senha, id_empresa, id_permissao } = userData;
        const userExists = await this.data.GetUserByEmail(email);

        if (userExists.length > 0) {
            throw new Error("Email já cadastrado");
        }

        const uuid = randomUUID();

        const hash = await bcrypt.hash(senha, 10);
        await this.data.CreateUser(uuid, nome, email, hash, id_empresa, id_permissao);
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

            return { token, email: user.email, nome: user.nome, uuid: user.uuid, cookiesOptions: cookiesOptions };

        } catch (error) {
            throw new Error(error.message);
        }

    }

    async TokenJWT(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET);
    }

    async GetUsers() {

        try {
            const users = await this.data.GetUsers();
            return users;

        } catch (error) {
            throw new Error(error.message);
        }

    }



}