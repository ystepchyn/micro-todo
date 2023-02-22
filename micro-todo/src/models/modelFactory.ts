import { MapInstance } from '../db/map-client/MapInstance';
import { MongoInstance } from '../db/mongo-client/MongoInstance';
import AuthorModel from './mongo/Author';
import ToDoModel from './mongo/Todo';


export class AuthorModelFactory {
    static create(config: any) {
        if (config.dbClient === "map") {
            // return new MapInstance(new Map<string, Author>());
            throw new Error(`map db is not supported`);
        } else if (config.dbClient === "mongodb") {
            return new MongoInstance(AuthorModel);
        } else {
            throw new Error(`${config.dbClient} is not supported`);
        }
    }
}

export class TodoModelFactory {
    static create(config: any) {
        if (config.dbClient === "map") {
            // return new MapInstance(new Map<string, ToDo>());
            throw new Error(`map db is not supported`);
        } else if (config.dbClient === "mongodb") {
            return new MongoInstance(ToDoModel);
        } else {
            throw new Error(`${config.dbClient} is not supported`);
        }
    }
}