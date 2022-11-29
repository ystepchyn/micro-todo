import mongoose from "mongoose";
import { ToDoModel } from "./models/mongo_models";


export interface ToDo {
    id?: string,
    author: string,
    name: string,
    description: string,
    createdAt?: Date,
    modifiedAt?: Date
}

export interface Author {
    id?: string,
    firstname: string,
    lastname: string,
    createdAt?: Date,
    modifiedAt?: Date
}

interface dbInstanceStrategy {
    getAllRecords(): Array<ToDo> | Array<Author>;
    getRecord(id: string): ToDo | Author;
    addRecord(r: ToDo | Author): ToDo | Author;
    updateRecord(r: ToDo | Author): ToDo | Author;
    deleteRecord(id: string): void;
}

export class MapInstance implements dbInstanceStrategy {

    private instance!: Map<string, ToDo | Author>;

    constructor() {
        if (!this.instance) {
            this.instance = new Map<string, ToDo | Author>();
        }
    }

    private uniqueId(): string {
        const dateString = Date.now().toString(36);
        const randomness = Math.random().toString(36).slice(2);
        return dateString + randomness;
    }

    getAllRecords(table?: string): Array<ToDo> | Array<Author> {
        // TODO: probably should add a table param from where to fetch records
        return Array.from(this.instance.values()) as Array<ToDo> | Array<Author>;
    }

    getRecord(id: string): ToDo | Author {
        if (!this.instance.has(id)) {
            throw "Record doesn't exist in Map!";
        };
        return this.instance.get(id) as ToDo | Author;
    }

    addRecord(r: ToDo | Author): ToDo | Author {
        //r.id = r.id ? r.id : this.uniqueId();
        r.id = this.uniqueId();
        r.createdAt = new Date();
        r.modifiedAt = new Date();
        this.instance.set(r.id, r);
        return r;
    }

    updateRecord(r: ToDo | Author): ToDo | Author {
        if (!this.instance.has(r.id as string)) {
            throw `Record with id ${r.id} doesn't exist in Map!`;
        }
        r.modifiedAt = new Date();
        this.instance.set(r.id as string, r);
        return r;
        //return this.instance.get(r.id);
    }

    deleteRecord(id: string): void {
        if (!this.instance.has(id)) {
            throw `Record with id ${id} doesn't exist in Map!`;
        }
        this.instance.delete(id);
    }
}

export class DBProvider {
    private instance: dbInstanceStrategy;

    constructor(inst: dbInstanceStrategy) {
        this.instance = inst;
    }

    getInstance() {
        return this.instance;
    }

    addRecord(r: ToDo) {
        return this.instance.addRecord(r);
    }

    getAllRecords() {
        return this.instance.getAllRecords();
    }

    getRecord(id: string) {
        return this.instance.getRecord(id);
    }

    updateRecord(r: ToDo | Author) {
        return this.instance.updateRecord(r);
    }

    deleteRecord(id: string) {
        return this.instance.deleteRecord(id);
    }
}

class MongoInstance {
    private databaseName: string;
    private model!: mongoose.Model<any>;

    constructor() {
        this.databaseName = process.env.MONGO_DB_NAME as string;
        this.mongoTest();
    }

    async getAllRecords() {
        return await ToDoModel.find();
    }

    async getRecord(id: string) {
        return await ToDoModel.find({ id: id }).exec();
    }

    async addRecord(r: ToDo) {
        // https://mongoosejs.com/docs/
        return await new ToDoModel(r).save();
    }

    async updateRecord(r) {
        //https://mongoosejs.com/docs/documents.html
    }

    async findRecord(id: string) {
        // https://mongoosejs.com/docs/api.html#model_Model-findById
        return await this.model.findById(id).exec();
    }

    async mongoTest() {
        try {
            await mongoose.connect(
                `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/${this.databaseName}`
            );
            //await mongoose.connect('mongodb://localhost:27017/test');
        } catch (error) {
            handleError(error);
        }
    }
}