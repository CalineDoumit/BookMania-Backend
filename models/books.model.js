const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:{
        type:String,
    },
    Author:{
        type:String,
    },
    Genre: {
        type: String,
    },
});


const Books = mongoose.model('Book', bookSchema);

module.exports = Books;