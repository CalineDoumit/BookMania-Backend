const express = require('express');
const bodyParser = require('body-parser');
const cors = require('../config/cors');

const Books = require('../models/books.model');
const RatedBooks = require('../models/ratedBooks.model');
const Users = require('../models/users.models');

const bookRouter = express.Router();

bookRouter.use(bodyParser.json());

bookRouter.route('/create')
    .post((req, res, next) => {
    Books.create(req.body)
        .then((book) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(book);

        }, (err) => next(err))
        .catch((err) => next(err));
        }
    )

bookRouter.route('/getall')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get( cors.corsWithOptions, (req,res,next) => {
        Books.find({})
            .then((books) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(books);
            }, (err) => next(err))
            .catch((err) => next(err));
    })




module.exports = bookRouter;