import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';

import { Permission } from "../../module/permission.js";
import { DataAuth } from "../../data/auth.js";
import { request } from "http";

export class ServiceAuth {

    constructor() {
        this.data = new DataAuth();
        this.permission = new Permission();
    }

    async Register({ email, name, password, id_company, id_permission, uuid: creator_id }) {

        const [requester_user] = await this.data.getUserByUuid(creator_id);

        if (!requester_user) {
            throw new Error("Usuário não encontrado");
        }

        const [user_exist] = await this.data.GetUserByEmail(email);

        if (user_exist) {
            throw new Error("Email já cadastrado");
        }

        if (id_permission == 1 && requester_user.id_permission != 1) {
            throw new Error("Você não tem permissão para cadastrar um usuário com essa permissão");
        }

        const uuid = randomUUID();
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.data.CreateUser(uuid, name, email, hashedPassword, id_company, id_permission);

        return { mensagem: "Usuário cadastrado com sucesso!" };
    }


    async Login(userData) {

        try {

            const { email, password } = userData;
            const [user_exist] = await this.data.GetUserByEmail(email);

            if (!user_exist) {
                throw new Error("Email não cadastrado");
            }

            const user = user_exist;

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                throw new Error("Senha incorreta");
            }

            const payload = {
                id_user: user.id_user,
                name: user.name
            }

            const token = await this.TokenJWT(payload)
            await this.data.CreateTokenUser(token, user.id_user);
            const cookiesOptions = {
                secure: (process.env.COOKIE_SECURE == 'true' ? true : false) || false, // alterar para true em produção
                path: '/',
                httpOnly: true,
            }

            return { token, email: user.email, name: user.name, uuid: user.uuid, cookiesOptions: cookiesOptions };

        } catch (error) {
            throw new Error(error.message);
        }

    }

    async TokenJWT(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET);
    }

    async GetUsers(payload) {
        try {
            const { uuid, limit, offset } = payload;
            const filter = { limit, offset };

            const [user] = await this.data.getUserByUuid(uuid);
            const getUsersFunction = this.data.GetUsers.bind(this.data);
            const users = await this.permission.listDataByPermission(user, getUsersFunction, filter);
            return users;

        } catch (error) {
            throw new Error(error.message);
        }
    }




}