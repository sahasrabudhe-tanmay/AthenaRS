const express = require('express');
const router = express.Router();
const User = require('../models/user');
const createJWT = require('../util/authentication').createJWT;

function buildSuccessResponse(user, token) {
    return {
        responseStatus: {
            status: 'SUCCESS'
        },
        user: user,
        token: token
    };
}

function buildFailureResponse(message) {
    return {
        responseStatus: {
            status: 'FAILURE',
            message: message
        }
    };
}

router.post('/login', (req, res) => {
    User.findOne({
        username: req.body.username
    }, (error, user) => {
        if (error) {
            console.log(error);
            res.json(buildFailureResponse('Error retrieving user details'));
        } else {
            if (user) {
                if (user.password === req.body.password) {
                    const token = createJWT(user.toObject());
                    res.json(buildSuccessResponse(user, token));
                } else {
                    res.json(buildFailureResponse('Invalid login credentials'));
                }
            } else {
                res.json(buildFailureResponse('Invalid login credentials'));
            }
        }
    });
});

router.post('/register', (req, res) => {
    User.findOne({
        username: req.body.username
    }, (error, existingUser) => {
        if (error) {
            console.log(error);
            res.json(buildFailureResponse('Error registering user'));
        } else if (existingUser) {
            res.json(buildFailureResponse('Username is unavailable'));
        } else {
            const user = new User({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                name: req.body.name
            });

            User.insertMany([user], (error, users) => {
                if (error) {
                    console.log(error);
                    res.json(buildFailureResponse('Error registering user'));
                } else {
                    const token = createJWT(users[0].toObject());
                    res.json(buildSuccessResponse(users[0], token));
                }
            })
        }
    });
});

router.get('/checkUsername/:username', (req, res) => {
    User.find({
        username: req.params.username
    }, (error, existingUser) => {
        if (error) {
            console.log(error);
            res.json(buildFailureResponse('Could not check username availability at this time'));
        } else if (existingUser && existingUser.length > 0) {
            res.json(buildFailureResponse('Username is unavailable'));
        } else {
            res.json(buildSuccessResponse(null));
        }
    });
});

module.exports = router;