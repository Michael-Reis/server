
import mysql from "mysql2/promise"

export class ConnectionMysql {

    async ConnectionMysql() {
        const conexao = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        });
        return conexao;
    }

    async executeQuery(query, valores) {
        const conexao = await this.ConnectionMysql();
        const [resultados] = await conexao.execute(query, valores);
        await conexao.end();
        return resultados;
    }


}