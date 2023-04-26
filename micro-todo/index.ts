import express from 'express';
import dotenv from 'dotenv';
import { restApiBuilder } from './src/restApiBuilder'

dotenv.config();

(async () => {

    const config = {
        dbClient: 'postgresql',
        // dbClient: process.env.DB_BACKEND,
        port: process.env.PORT,

        MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/micro-todo",
        MONGO_USER: process.env.MONGO_USER,
        MONGO_PW: process.env.MONGO_PW,

        POSTGRES_USER: process.env.POSTGRES_USER,
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
        POSTGRES_HOST: process.env.POSTGRES_HOST,
        POSTGRES_PORT: process.env.POSTGRES_PORT,
        POSTGRES_DB: process.env.POSTGRES_DB
    };

    const app = express();
    app.use(express.json());

    restApiBuilder.init(config);

    app.use(await restApiBuilder.createTodoApi());

    app.listen(process.env.PORT, () => {
        console.log(`[server]: Server is running at http://localhost:${process.env.PORT}`);
    });
})().catch(error => console.log(error))
