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

    async CreateUser(nome, email, senha) {
        const query = `INSERT INTO usuarios (nome, email, senha, dt_inclusao) VALUES (?, ?, ?, NOW())`;
        const valores = [nome, email, senha];
        return await this.conexao.executarQuery(query, valores);
    }

    async CreateTokenUser(token, id_usuario) {
        const query = `UPDATE usuarios SET token = ? WHERE id_usuario = ?`;
        const valores = [token, id_usuario];
        return await this.conexao.executarQuery(query, valores);
    }

}