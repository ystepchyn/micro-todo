const mongoose = require('mongoose');

const todoScheme = mongoose.Schema({
	// id: String,
	author: String,
	name: String,
	description: String,
	createdAt: Date,
	modifiedAt: Date
}, { "strict": "throw" });

const ToDoModel = mongoose.model('ToDo', todoScheme);

export default ToDoModel;