import { ConnectionMysql } from "../database/mysql.js";

export class DataAuth {

    constructor() {
        this.conexao = new ConnectionMysql();
    }

    async GetUserByEmail(email) {
        const query = `SELECT * FROM users WHERE email = ? AND deleted = 0`;
        const values = [email];
        const result = await this.conexao.executeQuery(query, values);
        return result;
    }

    getUserByUuid(uuid) {
        const query = `SELECT * FROM users WHERE uuid = ? AND deleted = 0`;
        const values = [uuid];
        return this.conexao.executeQuery(query, values);
    }

    getUserByToken(token) {
        const query = `SELECT * FROM users WHERE token = ? AND deleted = 0`;
        const values = [token];
        return this.conexao.executeQuery(query, values);
    }

    async CreateUser(uuid, name, email, password, id_company, id_permission) {
        const query = `INSERT INTO users (uuid, name, email, password, id_company, id_permission, dt_inclusion) VALUES (?, ?, ?, ?, ?, ?, NOW())`;
        const values = [uuid, name, email, password, id_company, id_permission];
        return await this.conexao.executeQuery(query, values);
    }

    async CreateTokenUser(token, id_user) {
        const query = `UPDATE users SET token = ? WHERE id_user = ? AND deleted = 0`;
        const values = [token, id_user];
        return await this.conexao.executeQuery(query, values);
    }

    async GetUsers(id_company, filter = null) {

        let limit = filter?.limit ?? 10;
        let offset = filter?.offset ?? 0;

        const whereClause = id_company ? 'WHERE id_company = ? AND deleted = 0' : 'WHERE deleted = 0';
        const baseQuery = `SELECT name, email, dt_inclusion, uuid FROM users ${whereClause} `;
        const query = `${baseQuery}  LIMIT ? OFFSET ?`;
        const values = id_company ? [id_company, limit, offset] : [limit, offset];
        const retorno = await this.conexao.executeQuery(query, values);
        return retorno;
    }

    async getUsersByIds(ids) {
        const placeholders = ids.map(() => '?').join(', '); // Cria uma string de marcadores de posição
        const query = `SELECT * FROM users WHERE uuid IN (${placeholders}) AND deleted = 0`;
        const retorno = await this.conexao.executeQuery(query, ids);
        return retorno;
    }

    async GetUsersCount(id_company) {
        const whereClause = id_company ? 'WHERE id_company = ? AND deleted = 0' : 'WHERE deleted = 0';
        const baseQuery = `SELECT COUNT(*) as count FROM users ${whereClause}`;
        const query = `${baseQuery}`;
        const values = id_company ? [id_company] : [];
        const retorno = await this.conexao.executeQuery(query, values);
        return retorno;
    }

    async DeleteUser(ids) {
        const placeholders = ids.map(() => '?').join(', '); // Cria uma string de marcadores de posição
        const query = `UPDATE users SET deleted = 1 WHERE uuid IN (${placeholders}) AND deleted = 0`;
        const values = ids;
        const retorno = await this.conexao.executeQuery(query, values);
        return retorno;
    }

    

    async GetCompanyById(id_company) {
        const query = `SELECT * FROM companies WHERE id_company = ? `;
        const values = [id_company];
        const retorno = await this.conexao.executeQuery(query, values);
        return retorno;
    }



}