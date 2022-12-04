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
	getAllRecords(): Array<ToDo> | Array<Author>;
	getRecord(id: string): ToDo | Author;
	addRecord(r: ToDo | Author): ToDo | Author;
	updateRecord(r: ToDo | Author): ToDo | Author;
	deleteRecord(id: string): void;
}
