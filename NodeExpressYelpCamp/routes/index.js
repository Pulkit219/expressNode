var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var middleware =require('../middleware');

router.get('/', function(req, resp)
{
  resp.render("landing");
});


//AUTH ROUTES


//=====================================================
//SHOW REGISTRATION FORM
router.get('/register',function(req,resp){
  resp.render('register');
})
//HANDLE SIGN UP LOGIC
router.post('/register',function(req,resp){
  var newUser = new User({username:req.body.username});
  User.register(newUser, req.body.password,function(err,user){
    if(err){
      //console.log(err.message);
      //req.flash('error',err.message);
      return resp.render('register',{error:err.message});
    }
    else{
      passport.authenticate('local')( req,resp,function(){
        req.flash('success',"Welcome to YelpCamp    " + user.username);
        resp.redirect('/campgrounds')
      });
    }
  })
})

//HANDLE SIGN IN LOGIC
router.get('/login',function(req,resp){
  resp.render('login');
})

router.post('/login', passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   successFlash: true,
                                   failureFlash: true
                                   }),
                                   function(req,resp){
req.flash('success',"Welcome back! ");
})

//HANDLE SIGN OUT LOGIC
router.get('/logout',function(req,resp){
  req.logout();
  req.flash('success',"You're logged out " + resp.locals.currentUser.username );
  resp.redirect('/campgrounds');
})
//middleware
/*
function isLoggedIn(req,resp,next){
  if(req.isAuthenticated()){
    return next();
  }
  resp.redirect('/login')
}*/

module.exports = router;
