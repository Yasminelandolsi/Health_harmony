const express = require('express');
const router = express.Router();

// MongoDB user model
const User = require('./../models/User');
// Password handler
const bcrypt = require('bcrypt');


// Sign up
router.post('/signup', (req, res) => {
    let { name, email, password } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();

    if (name === "" || email === "" || password === "") {
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        });
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
        res.json({
            status: "FAILED",
            message: "Invalid name entered"
        });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.json({
            status: "FAILED",
            message: "Invalid email entered"
        });
    } else if (password.length < 8) {
        res.json({
            status: "FAILED",
            message: "Password is too short!"
        });
    } else {
        // Checking if user already exists 
        User.findOne({ email })
            .then(existingUser => {
                if (existingUser) {
                    // A user already exists
                    res.json({
                        status: "FAILED",
                        message: "User with the provided email already exists"
                    });
                } else {
                    // Try to create new user

                    // Password handling 
                    const saltRounds = 10;
                    bcrypt.hash(password, saltRounds)
                        .then(hashedPassword => {
                            const newUser = new User({
                                name,
                                email,
                                password: hashedPassword,
                            });
                            newUser.save()
                                .then(result => {
                                    res.json({
                                        status: "SUCCESS",
                                        message: "Signup successful",
                                        data: result,
                                    });
                                })
                                .catch(err => {
                                    console.error(err);
                                    res.json({
                                        status: "FAILED",
                                        message: "An error occurred while saving user account!"
                                    });
                                });
                        })
                        .catch(err => {
                            console.error(err);
                            res.json({
                                status: "FAILED",
                                message: "An error occurred while hashing password!"
                            });
                        });
                }
            })
            .catch(err => {
                console.error(err);
                res.json({
                    status: "FAILED",
                    message: "An error occurred while checking for existing user!"
                });
            });
    }
});

// Sign in
router.post('/signin', (req, res) => {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();
    if (email === "" || password === "") {
        res.json({
            status: "FAILED",
            message: "Empty credentials supplied"
        });
    } else {
        // Check if user exists
        User.findOne({ email })
            .then(user => {
                if (user) {
                    // User exists
                    const hashedPassword = user.password;
                    bcrypt.compare(password, hashedPassword)
                        .then(result => {
                            if (result) {
                                // Password match
                                res.json({
                                    status: "SUCCESS",
                                    message: "Signin successful",
                                });
                            } else {
                                res.json({
                                    status: "FAILED",
                                    message: "Invalid password entered!"
                                });
                            }
                        })
                        .catch(err => {
                            console.error(err);
                            res.json({
                                status: "FAILED",
                                message: "An error occurred while comparing passwords"
                            });
                        });
                } else {
                    res.json({
                        status: "FAILED",
                        message: "Invalid credentials entered!"
                    });
                }
            })
            .catch(err => {
                console.error(err);
                res.json({
                    status: "FAILED",
                    message: "An error occurred while checking for existing user"
                });
            });
    }
});

module.exports = router;
