const mongoose = require('mongoose');

export const Author = mongoose.model('Author', {
	id: String,
	firstname: String,
	lastname: String,
	createdAt: Date,
	modifiedAt: Date
});
