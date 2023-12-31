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


    async Register({ email, name, password, id_company, id_permission, token }) {

        const [requester_user] = await this.data.getUserByToken(token);
        const [company] = await this.data.GetCompanyById(id_company);
        const [user_exist] = await this.data.GetUserByEmail(email);


        if (!company) throw new Error("Empresa não encontrada");
        if (!requester_user) throw new Error("Usuário não encontrado");
        if (company.id_company != requester_user.id_company) throw new Error("Você não tem permissão para cadastrar um usuário para essa empresa");


        if (user_exist) throw new Error("Email já cadastrado");

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
            const GetUsersCountFunction = this.data.GetUsersCount.bind(this.data);
            const users = await this.permission.listDataByPermission(user, getUsersFunction, filter);
            const [all_users] = await this.permission.listDataByPermission(user, GetUsersCountFunction);

            const result = {
                information: users,
                recordsTotal: all_users.count,
                recordsFiltered: users.length
            }

            return result;

        } catch (error) {
            throw new Error(error.message);
        }
    }


    async DeleteUser(payload) {
        try {
            const { ids, token } = payload;
            const [user] = await this.data.getUserByToken(token);

            if(!user) throw new Error("Usuário não encontrado");

            // Obtenha informações sobre os usuários a serem excluídos
            const usersToDelete = await this.data.getUsersByIds(ids);

            if (usersToDelete.length === 0) {
                throw new Error("Usuário não encontrado");
            }

            this.permission.checkUserPermissionForUserDeletion(user, usersToDelete);

            // Exclua os usuários
            await this.data.DeleteUser(ids);

            return {message: "Usuário deletado com sucesso!"};
            
        } catch (error) {
            throw new Error(error.message);
        }
    }



}