import mongoose from "mongoose";
import { Client } from 'pg';


class DatabaseConnectionFactory {
    static async create(config: any): Promise<any> {
        if (config.dbClient === "map") {
            // return new MapInstance();
            throw new Error(`map db is not supported`);
        } else if (config.dbClient === "mongodb") {
            const options = {
                "user": config.MONGO_USER,
                "pass": config.MONGO_PW
            };
            return mongoose.connect(config.MONGO_URL, options);
        } else if (config.dbClient === "postgresql") {
            const client = new Client('postgres://admin:admin@localhost/microtodo');
            await client.connect();
            return client;
        } else {
            throw new Error(`${config.dbClient} is not supported`);
        }
    }
}

export default DatabaseConnectionFactory;