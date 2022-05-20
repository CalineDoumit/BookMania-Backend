const express = require('express');
const bodyParser = require('body-parser');

const Books = require('../models/books.model');

const bookRouter = express.Router();

bookRouter.use(bodyParser.json());

bookRouter.route('/create')
    .post((req, res, next) => {
    Books.create(req.body)
        .then((book) => {
            console.log(book)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(book);

        }, (err) => next(err))
        .catch((err) => next(err));
        }
    )

module.exports = bookRouter;