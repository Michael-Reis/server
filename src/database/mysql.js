
import mysql from "mysql2/promise"

export class ConexaoMysql {

    async ConexaoMysql() {
        const conexao = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        });
        return conexao;
    }

    async executarQuery(query, valores) {
        const conexao = await this.ConexaoMysql();
        const [resultados] = await conexao.execute(query, valores);
        await conexao.end();
        return resultados;
    }


}