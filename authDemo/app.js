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

passport.use(new localStrategy(User.authenticate()));
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
  User.register(new User({username: req.body.username}), req.body.password, function(err,user){
    if(err)
    {
      console.log(err);
    return resp.render('register');
    }
    else {
      {
        passport.authenticate('local')(req,resp,function(){
          resp.redirect('/secret');
        })
      }
    }
  })

})

//LOGIN FORM
app.get('/login', function(req,resp){
  resp.render('login');
})


app.post('/login',passport.authenticate('local', {
  successRedirect:'/secret',
  failureRedirect:'/login'
}) ,function(req,resp){


});

app.get('/logout', function(req, resp){
  req.logout();
  resp.redirect('/');
})
//====================================================


app.listen(4200, function()
{
  console.log('server started');
})
