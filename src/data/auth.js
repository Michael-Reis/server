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
        const query = `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`;
        const valores = [nome, email, senha];
        return await this.conexao.executarQuery(query, valores);
    }

}