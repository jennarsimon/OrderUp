var express = require('express');
const router = express.Router();
const User = require('../../../model/User.js'); 
const bcrypt = require('bcrypt');

// create a new user
router.post('/', (req, res, next) => {
    console.log('enter post');

    const user = new User({
       firstName : req.body.firstName,
       lastName : req.body.lastName,
       userName : req.body.userName,
       password : req.body.password,
    });
    bcrypt.hash(user.password, 10, function (err, hash){
        if (err) { 
        return next(err);
        }
        user.password = hash;
        user.save().then(data => {
            console.log('Successfully created a new User');
            res.redirect('/users/' + req.body.userName);
        }).catch(error => {
            console.log('username is taken');
        });
        
    })

})

// get request for all users
router.get('/', (req, res, next) => {
    User.find(function (err, users) {
        res.send(users);
    });
})

// get request for a specific user
router.get('/:username', (req, res, next) => {

    var id = req.params.username;
    User.findOne({userName: id}, function(err, user){
        if(err){
            console.log(err);
            res.status(500).send("error getting user by username");
            return;
        }
        else if(!user){
            res.status(404).send("No users found");
            return;
        }
        delete user._id;
        delete user.password;
        delete user.__v;
        res.send(user);
  })

})

module.exports = router;