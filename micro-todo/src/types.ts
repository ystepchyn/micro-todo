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

export interface dbInstance {
	getAllRecords(table: string): Promise<any>;
	getRecord(id: string): Promise<any>;
	addRecord(data: ToDo | Author): Promise<any>;
	updateRecord(id: string, data: ToDo | Author): Promise<any>;
	deleteRecord(id: string): Promise<any>;
}
