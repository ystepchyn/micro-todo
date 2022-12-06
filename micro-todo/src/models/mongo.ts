const mongoose = require('mongoose');

export const ToDoModel = mongoose.model('ToDo', {
	id: String,
	author: String,
	name: String,
	description: String,
	createdAt: Date,
	modifiedAt: Date
});

export const Author = mongoose.model('Author', {
	id: String,
	firstname: String,
	lastname: String,
	createdAt: Date,
	modifiedAt: Date
});
