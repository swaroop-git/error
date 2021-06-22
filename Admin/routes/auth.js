const adminModel = require('../models/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



router.post('/signup', function (req, res) {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        else {
            const user = new adminModel({
                name: req.body.name,
                email_address: req.body.email_address,
                password: hash,
            });
            user.save().then(function (result) {
                console.log(result);
                res.status(200).json({
                    success: 'New admin has been created..'
                });
            }).catch(error => {
                res.status(500).json({
                    error: err
                });
            });
        }
    });
});

router.post('/signin', function (req, res) {

    adminModel.findOne({ email_address: req.body.email_address })
        .exec()
        .then(function (admin) {
            bcrypt.compare(req.body.password, admin.password, function (err, result) {
                if (err) {
                    return res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }
                if (result) {
                    const JWTToken = jwt.sign({
                        email_address: admin.email_address,
                    },
                        'secretkey',
                        {
                            expiresIn: '2h'
                        });
                    return res.status(200).json({
                        success: 'Welcome to the JWT Auth',
                        token: JWTToken
                    });
                }
                return res.status(401).json({
                    failed: 'The Password is incorrect.'
                });
            });
        })
        .catch(error => {
            res.status(500).json({
                failed: "This Email-ID does not exist."
            });
        });
});

router.post('/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
});

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }

}

module.exports = router;