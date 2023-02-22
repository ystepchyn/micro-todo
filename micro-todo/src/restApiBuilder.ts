import DatabaseConnectionFactory from './db/DbFactory'
import { MicroTodoApi } from './microTodoApi'
import { AuthorModelFactory, TodoModelFactory } from './models/modelFactory'
import { Router } from 'express';


export class restApiBuilder {
    createAuthorApi(config: any) {
    }

    static async createTodoApi(config: any) {

        const db = await DatabaseConnectionFactory.create(config);

        const model = TodoModelFactory.create(config);

        MicroTodoApi.init(model);

        const app = Router();

        app.get('/todo', MicroTodoApi.getAllRecords);

        app.post('/todo/', MicroTodoApi.addRecord);

        app.route('/todo/:id')
            .get(MicroTodoApi.getRecord)
            .put(MicroTodoApi.updateRecord)
            .delete(MicroTodoApi.deleteRecord);

        return app;
    }
}