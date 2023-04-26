import { dbInstance } from '../../types'
import { ToDo, Author } from '../../types';


export class PostgreSqlModel implements dbInstance {
    db: any;
    table: string;

    constructor(table: string) {
        this.table = table;
    }

    async tableExists(tn: string) {
        const q = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${tn}'`;
        let { rows } = await this.db.query(q);
        console.log(q);
        if (Object.keys(rows).length > 0) {
            return true;
        }
        return false;
    }

    async initDb(db: any) {
        this.db = db;

        const texists = await this.tableExists(this.table);

        if (this.table == 'todo' && !texists) {
            const sql = `CREATE TABLE ${this.table} ( \
                            id int,   \
                            author varchar(255),  \
                            name varchar(255), \
                            description varchar(255),   \
                            createdAt timestamp NOT NULL DEFAULT NOW(),  \
                            modifiedAt timestamp NOT NULL DEFAULT NOW() \
                        )`;

            await this.db.query(sql);

        } else if (this.table == 'todo') {

            const sql2 = `CREATE TABLE ${this.table} ( \
                    id int,   \
                    firstname varchar(255),  \
                    lastname varchar(255), \
                    createdAt timestamp,   \
                    modifiedAt timestamp   \
                )`;

            await this.db.query(sql2);

        } else {
            throw new Error('table is not recognized');
        }
    }

    getAllRecords() {
        const sql = `SELECT * FROM ${this.table}`;
        return this.db.query(sql);
    }

    getRecord(id: string) {
        return Promise.reject(new Error('Not implemented!'));
    }

    addRecord(data: ToDo | Author) {
        const columns = Object.keys(data).join(', ');
        const values = [...Object.keys(data), new Date(), new Date()].join(', ');

        const sql = `INSERT INTO ${this.table} (${columns}) VALUES (${values})`;
        // const sql = `INSERT INTO table_name (author, name, description, createdAt, modifiedAt) VALUES (${author}, ${name}, ${description}, ${new Date()}, ${new Date()})`;
        return this.db.query(sql);
    }

    updateRecord(id: string, data: ToDo | Author) {
        // const sql = `INSERT INTO table_name (author, name, description, createdAt, modifiedAt) VALUES (${author}, ${name}, ${description}, ${new Date()}, ${new Date()})`;
        return Promise.reject(new Error('Not implemented!'));
    }

    deleteRecord(id: string) {
        return Promise.reject(new Error('Not implemented!'));
    }
}