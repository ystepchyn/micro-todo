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

export interface dbInstanceStrategy {
	getAllRecords(): Promise<any>;
	getRecord(id: string): Promise<any>;
	addRecord(r: ToDo | Author): Promise<any>;
	updateRecord(r: ToDo | Author): Promise<any>;
	deleteRecord(id: string): Promise<any>;
}
