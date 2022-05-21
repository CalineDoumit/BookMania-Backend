const express = require('express');
const bodyParser = require('body-parser');
const cors = require('../config/cors');

const RatedBook = require('../models/ratedBooks.model');
const Book = require('../models/books.model');
const User = require('../models/users.models');

const RatedBookRouter = express.Router();

RatedBookRouter.use(bodyParser.json());

RatedBookRouter.route('/create')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .post( cors.corsWithOptions, (req,res,next) => {

        //Create a book in the Book Model
        Book.create({title:req.title,Author:req.author,Genre:req.genre})
            .then((book) => {
            }, (err) => next(err))
            .catch((err) => next(err));


        //Create a row in RatedBook Model
        var book_id=null;
        var user_id=null;

        //1-find the id of book
        Book.find({title:req.title})
            .then((book) => {
                book_id=book[0]._id;
        //2-find the id of user
                User.find({username:req.username})
                .then((user) => {
                    var user_id=user._id;
        //3-fill row of ratedBook
                    RatedBook.create({rating:req.rating,bookId:book_id,userId:user_id})
                    .then((ratedBook) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(ratedBook);
                    }, (err) => next(err))
                }, (err) => next(err))
            }, (err) => next(err))
            .catch((err) => next(err));

    })

RatedBookRouter.route('/get/:id')
        .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
        .get( cors.corsWithOptions, (req,res,next) => {
            var highestRating=0;
            Book.findById(req.params.id)
                .then((books) => {
                    for (let i=0;i<books.length;i++){
                        if (books[i].rating>highestRating){highestRating=books[i].rating}
                    }
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(highestRating);
                }, (err) => next(err))
                .catch((err) => console.log(err));
        })

module.exports = RatedBookRouter;