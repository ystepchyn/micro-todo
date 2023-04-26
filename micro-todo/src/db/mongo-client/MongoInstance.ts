import { dbInstance } from '../../types'
import { ToDo, Author } from '../../types';

export class MongoInstance implements dbInstance {
    model: any;
    db: any;

    constructor(model: any) {
        this.model = model;
    }

    initDb(db: any) {
        this.db = db;
    }

    getAllRecords() {
        return this.model.find({});
    }

    getRecord(id: string) {
        return this.model.findById(id).exec();
    }

    addRecord(data: ToDo | Author) {
        const rec = { ...data, createdAt: new Date(), modifiedAt: new Date() };
        return this.model.create(rec);
    }

    updateRecord(id: string, data: ToDo | Author) {
        return this.model.findByIdAndUpdate(id, { ...data, modifiedAt: new Date() });
        // return this.model.findByIdAndUpdate(id, { ...data, modifiedAt: new Date() }, { "runValidators": true });
    }

    deleteRecord(id: string) {
        return this.model.findByIdAndDelete(id);
    }
}