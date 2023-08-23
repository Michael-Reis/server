
import mysql from "mysql2/promise"

export class ConexaoMysql {

    async ConexaoMysql() {
        const conexao = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "synix"
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