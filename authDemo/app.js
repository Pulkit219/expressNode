var express =require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require('passport');
var localStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require ('./models/user');


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/auth_app", {useMongoClient: true});
app.set('view engine' , 'ejs');
app.use(require('express-session')({
  secret:'SOme secret code',
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(bodyParser.urlencoded({extended:true}));





//ROUTES
//====================================================

app.get('/', function(req, resp)
{
  resp.render("home");
});

app.get('/secret', function(req, resp)
{
  resp.render("secret");
});

//Auth ROUTES
app.get('/register', function(req,resp){
  resp.render('register');
})

app.post('/register',function(req,resp){
  resp.send("post route");
  
})


//====================================================


app.listen(4200, function()
{
  console.log('server started');
})
