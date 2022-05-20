var express = require('express');
var router = express.Router();
var passport = require('passport');
const cors = require('../config/cors');

var User=require('../models/users.models')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


router.route('/signup')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .post((req, res, next) => {
    User.register(new User({username: req.body.username}),
        req.body.password, (err, user) => {
            if(err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({err: err});
            }
            else {
                passport.authenticate('local')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true, status: 'Registration Successful!'});
                });
            }
        });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, status: 'You are successfully logged in!'});
});

router.route('/allusers')
    .get( (req,res,next) => {
        User.find({})
            .then((users) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(users);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
module.exports = router;
