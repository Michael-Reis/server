import { ConnectionMysql } from "../database/mysql.js";

export class DataAuth {

    constructor() {
        this.conexao = new ConnectionMysql();
    }

    async GetUserByEmail(email) {
        const query = `SELECT * FROM users WHERE email = ?`;
        const values = [email];
        const result = await this.conexao.executeQuery(query, values);
        return result;
    }

    getUserByUuid(uuid) {
        const query = `SELECT * FROM users WHERE uuid = ?`;
        const values = [uuid];
        return this.conexao.executeQuery(query, values);
    }

    async CreateUser(uuid, name, email, password, id_company, id_permission) {
        const query = `INSERT INTO users (uuid, name, email, password, id_company, id_permission, dt_inclusion) VALUES (?, ?, ?, ?, ?, ?, NOW())`;
        const values = [uuid, name, email, password, id_company, id_permission];
        return await this.conexao.executeQuery(query, values);
    }

    async CreateTokenUser(token, id_user) {
        const query = `UPDATE users SET token = ? WHERE id_user = ?`;
        const values = [token, id_user];
        return await this.conexao.executeQuery(query, values);
    }


    async GetUsers(id_company, offset, limit) {
        const baseQuery = `SELECT * FROM users ${id_company ? `WHERE id_company = ?` : ''}`;
        const query = `${baseQuery} LIMIT ? OFFSET ?`;
        const values = id_company ? [id_company, limit, offset] : [limit, offset];
        return await this.conexao.executeQuery(query, values);
    }


}