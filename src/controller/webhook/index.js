import { ConnectionMysql } from "../../database/mysql.js";

export class ControllerWebhook {

    constructor() {
        this.connection = new ConnectionMysql();
    }

    async Webhook() {

        const resultado = await this.getNumber();
        const soma = resultado.soma + 1;
        await this.connection.executeQuery(`UPDATE teste SET soma = ?`, [soma]);
    }

    async getNumber() {
        const result = await this.connection.executeQuery(`SELECT soma FROM teste `);
        return result[0]
    }

}