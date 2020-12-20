var express = require('express');
const router = express.Router();
const User = require('../model/User.js'); 
const bcrypt = require('bcrypt');

router.post('/', (request, response) => {

    const user = new User({
       firstName : request.body.firstName,
       lastName : request.body.lastName,
       userName : request.body.userName,
       password : request.body.password,
       email : request.body.email
    });
    bcrypt.hash(user.password, 10, function (err, hash){
        if (err) { 
        return next(err);
        }
        user.password = hash;
        user.save().then(data => {
            console.log('Successfully created a new User');
        }).catch(error => {
            
            console.log('error code', error.code);
            if (error.code == 11000) {
                if(error.keyPattern.email) {
                    response.status(400).send("Email address is taken");
                }
                else if(error.keyPattern.userName) {
                    response.status(400).send("Username is taken");
                }
            }
            else {
                response.status(500).send('error creating user');
            }
            
        });
        
    })

})
module.exports = router;