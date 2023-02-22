const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
	id: String,
	firstname: String,
	lastname: String,
	createdAt: Date,
	modifiedAt: Date
});

const Author = mongoose.model('Author', authorSchema);

export default Author;