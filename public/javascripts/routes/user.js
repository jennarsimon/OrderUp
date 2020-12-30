var express = require('express');
const router = express.Router();
const User = require('../../../model/User.js'); 
const bcrypt = require('bcrypt');

// create a new user
router.post('/', (req, res, next) => {
    console.log('enter post');

    User.findOne({userName: req.body.userName}, function(err, user_check){
        if(err) {
            console.log('error finding user');
        }
        if(user_check) {
            console.log('entered post, user exists', user_check);
            bcrypt.compare(req.body.password, user_check.password, function(err, result) {
                if(err) {
                    console.log('error checking password');
                }
                else if(result){
                    console.log('correct password');
                    res.status(201).redirect('/home/' + req.body.userName);
                }
                else{
                    console.log('incorrect password');
                    res.status(400).send('incorrect password');
                }
            })
            return;
        }
        else {
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
                 user.save().then((result, err) => {
                     if(err) {
                         console.log('err', err);
                         console.log('result', result);
                         res.status(500).send('error creating user');
                         return;
                     }
                     res.status(201).redirect('/home/' + req.body.userName);
                     console.log('Successfully created a new User');
                 })
                 
             })
        }
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

        const altered_user = {};
        altered_user.firstName = user.firstName;
        altered_user.lastName = user.lastName;
        altered_user.userName = user.userName;
        res.send(altered_user);
  })

})

module.exports = router;