const mongoose = require('mongoose');

export const ToDoModel = mongoose.model('ToDo', {
	id: String,
	author: String,
	name: String,
	description: String,
	createdAt: Date,
	modifiedAt: Date
});