// setup server
var express = require('express');
var app = express();
app.listen(3000, () => {
   console.log('Server listening on 3000');
})

// allow use of .env
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

// connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
   console.log('Connected to Mongo DB Successfully');
})

// allow parsing of JSON
const bodyParser = require('body-parser');
app.use( bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set up user routes
const usersRoute = require('./routes/user.js');
app.use('/users' , usersRoute);

// direct to login page
app.get('/',function(req,res){
   res.sendFile(__dirname+'/views/signup.html');
});

// direct to login page
app.get('/about',function(req,res){
   res.sendFile(__dirname+'/views/about.html');
});

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));