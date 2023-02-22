import express from 'express';
import dotenv from 'dotenv';
import { restApiBuilder } from './src/restApiBuilder'

dotenv.config();


(async () => {
    const app = express();
    const config = {
        dbClient: process.env.DB_BACKEND,
        port: process.env.PORT,
        MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/micro-todo",
        MONGO_USER: process.env.MONGO_USER,
        MONGO_PW: process.env.MONGO_PW
    };

    app.use(express.json());
    app.use(await restApiBuilder.createTodoApi(config));

    app.listen(process.env.PORT, () => {
        console.log(`[server]: Server is running at http://localhost:${process.env.PORT}`);
    });
})().catch(error => console.log(error))
