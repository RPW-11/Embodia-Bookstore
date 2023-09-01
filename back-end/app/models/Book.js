const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title can't be empty"],
        maxLength: [200, "Title must be max at 200 characters"],
        trim: true
    },
    author: {
        type: String,
        maxLength: [200, "Author must be max at 200 characters"],
    },
    description: {
        type: String,
        maxLength: [1000, "Description must be max at 1000 characters"],
    },
    price: {
        type: Number,
        required: [true, "Price can't be empty"],
    },
    coverImage: {
        type: String,
    },
    genre: {
        type: String,
        maxLength: [50, "Genre must be max at 50 characters"]
    },
    publishedDate: {
        type: Date,
        required: [true, "Date can't be empty"],
    },
    stockQuantity: {
        type: Number,
        required: [true, "Stock can't be empty"],
    }
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;