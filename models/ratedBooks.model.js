const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratedBookSchema = new Schema({
    rating:{
        type:Number,
    },
    BookId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});


const RatedBooks = mongoose.model('RatedBook', ratedBookSchema);

module.exports = RatedBooks;