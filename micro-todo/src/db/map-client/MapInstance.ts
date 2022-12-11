import { ToDo, Author, dbInstanceStrategy } from '../../types'


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