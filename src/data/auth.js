import { ConexaoMysql } from "../database/mysql.js";

export class DataAuth {

    constructor() {
        this.conexao = new ConexaoMysql();
    }

    async GetUserByEmail(email) {
        const query = `SELECT * FROM usuarios WHERE email = ?`;
        const valores = [email];
        const result = await this.conexao.executarQuery(query, valores);
        return result;

    }

    async CreateUser(uuid, nome, email, senha, id_empresa, id_permissao) {
        const query = `INSERT INTO usuarios (uuid, nome, email, senha, id_empresa, id_permissao, dt_inclusao) VALUES (?, ?, ?, ?, ?, ?, NOW())`;
        const valores = [uuid, nome, email, senha, id_empresa, id_permissao];
        return await this.conexao.executarQuery(query, valores);
    }

    async CreateTokenUser(token, id_usuario) {
        const query = `UPDATE usuarios SET token = ? WHERE id_usuario = ?`;
        const valores = [token, id_usuario];
        return await this.conexao.executarQuery(query, valores);
    }

    async GetUsers() {
        const query = `SELECT * FROM usuarios`;
        return await this.conexao.executarQuery(query);
    }

}