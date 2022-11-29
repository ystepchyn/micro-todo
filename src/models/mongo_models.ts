const mongoose = require('mongoose');

/*interface ToDo {
	id: string,
	author: string,
	name: string,
	description: string,
	createdAt: Date,
	modifiedAt: Date
}

interface Author {
	id: string,
	firstname: string,
	lastname: string,
	createdAt: Date,
	modifiedAt: Date
}*/

/*const todoSchema = new mongoose.Schema({
    id: String,
    author: String,
    name: String,
    description: String,
    createdAt: Date,
    modifiedAt: Date
});*/

export const ToDoModel = mongoose.model('ToDo', {
	id: String,
	author: String,
	name: String,
	description: String,
	createdAt: Date,
	modifiedAt: Date
});

/*new todo({
	id: '1',
	author: 'Zlatan',
	name: 'Zlatan Ibrahimović',
	description: 'A.C. Milan',
	createdAt: new Date(),
	modifiedAt: new Date()
}).save();*/

export const Author = mongoose.model('Author', {
	id: String,
	firstname: String,
	lastname: String,
	createdAt: Date,
	modifiedAt: Date
});