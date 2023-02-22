import { ToDo, Author, dbInstance } from '../../types'


// export class MapInstance implements dbInstance {
export class MapInstance {

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
/* 
    async getAllRecords(table?: string): Promise<any> {
        // TODO: probably should add a table param from where to fetch records
        return Array.from(this.instance.values()) as Array<ToDo> | Array<Author>;
    }

    async getRecord(id: string): Promise<any> {
        if (!this.instance.has(id)) {
            throw "Record doesn't exist in Map!";
        };
        return this.instance.get(id) as ToDo | Author;
    }

    async addRecord(r: ToDo | Author): Promise<any> {
        //r.id = r.id ? r.id : this.uniqueId();
        r.id = this.uniqueId();
        r.createdAt = new Date();
        r.modifiedAt = new Date();
        this.instance.set(r.id, r);
        return r;
    }

    async updateRecord(r: ToDo | Author): Promise<any> {
        if (!this.instance.has(r.id as string)) {
            throw `Record with id ${r.id} doesn't exist in Map!`;
        }
        r.modifiedAt = new Date();
        this.instance.set(r.id as string, r);
        return r;
        //return this.instance.get(r.id);
    }

    async deleteRecord(id: string): Promise<any> {
        if (!this.instance.has(id)) {
            throw `Record with id ${id} doesn't exist in Map!`;
        }
        this.instance.delete(id);
    } */
}