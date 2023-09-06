import mysql from "mysql2/promise";

export class ConnectionMysql {
    constructor() {
        this.pool = mysql.createPool({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            waitForConnections: true, // Aguardar por conexões disponíveis no pool
            connectionLimit: 10, // Limite máximo de conexões simultâneas
            queueLimit: 0 // Limite de fila (0 para ilimitado)
        });
    }

    async executeQuery(query, valores) {
        const conexao = await this.pool.getConnection(); // Obter uma conexão do pool
        try {
            const [resultados] = await conexao.execute(query, valores);
            return resultados;
        } catch (error) {
            throw error;
        } finally {
            conexao.release(); // Liberar a conexão de volta para o pool
        }
    }
}
