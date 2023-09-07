import { ConnectionMysql } from '../database/mysql.js';

export class DataWebhook {

    constructor() {
        this.connection = new ConnectionMysql();

    }

    async getNumber() {
        const result = await this.connection.executeQuery(`SELECT soma FROM teste `);
        return result[0]

    }

    async updateNumber(soma) {
        return await this.connection.executeQuery(`UPDATE teste SET soma = ?`, [soma]);
    }
}