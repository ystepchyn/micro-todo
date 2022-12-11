import { ToDo, Author, dbInstanceStrategy } from '../types'


export default class DBProvider {
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