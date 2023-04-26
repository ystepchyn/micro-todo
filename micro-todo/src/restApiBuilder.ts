import DatabaseConnectionFactory from './db/dbFactory'
import { MicroTodoApi } from './microTodoApi'
import { AuthorModelFactory, TodoModelFactory } from './models/modelFactory'
import { Router } from 'express';


export class restApiBuilder {
    static db: any;
    static dbhandler: import("/Users/yaroslavstepchyn/Documents/code/micro-todo/micro-todo/src/db/mongo-client/MongoInstance").MongoInstance | import("/Users/yaroslavstepchyn/Documents/code/micro-todo/micro-todo/src/db/sql-client/postgreSqlModel").PostgreSqlModel;

    static async init(config: any) {
        this.db = await DatabaseConnectionFactory.create(config);
        this.dbhandler = TodoModelFactory.create(config);
        this.dbhandler.initDb(this.db);
    }

    createAuthorApi() {
    }

    static async createTodoApi() {

        // const db = await DatabaseConnectionFactory.create(config);

        // const dbhandler = TodoModelFactory.create(config);

        // dbhandler.initDb(db);

        MicroTodoApi.init(this.dbhandler);

        const app = Router();

        app.get('/todo', async (req, res) => {
            res.json({ "todo_tasks": await this.dbhandler.getAllRecords() });
        });
        // app.get('/todo', MicroTodoApi.getAllRecords);

        app.post('/todo/', MicroTodoApi.addRecord);

        app.route('/todo/:id')
            .get(MicroTodoApi.getRecord)
            .put(MicroTodoApi.updateRecord)
            .delete(MicroTodoApi.deleteRecord);

        return app;
    }
}