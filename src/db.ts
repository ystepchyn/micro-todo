class Database {
    private instance!: Map<string, string>;

    constructor() {
        if (!this.instance) {
            this.instance = new Map<string, string>();
        }
    }
    getValues(): string[] {
        return Array.from(this.instance.values());
    }

    getRecord(id: string) {
        return this.instance.get(id);
    }

    addRecord(r: { id: string; task: string }): boolean {
        if (!this.instance.has(r.id)) {
            this.instance.set(r.id, r.task);
            return true;
        }
        return false;
    }

    updateRecord(r: { id: string; task: string }) {
        this.instance.set(r.id, r.task);
        return this.instance.get(r.id);
    }

    deleteRecord(id: string) {
        this.instance.delete(id);
    }
}

export default Database;