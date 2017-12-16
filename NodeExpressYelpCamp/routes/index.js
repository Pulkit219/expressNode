var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var middleware =require('../middleware');

router.get('/', function(req, resp)
{
  resp.render("landing");
});


//====================================


//AUTH ROUTES
//=====================================================
//show registration form
router.get('/register',function(req,resp){
  resp.render('register');
})
//handle sign up logic
router.post('/register',function(req,resp){
  var newUser = new User({username:req.body.username});
  User.register(newUser, req.body.password,function(err,user){
    if(err){
      console.log(err);
      return resp.render('register');
    }
    else{
      passport.authenticate('local')( req,resp,function(){
        resp.redirect('/campgrounds')
      });
    }
  })
})

//sign in login
router.get('/login',function(req,resp){
  resp.render('login');
})

router.post('/login', passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',

                                   }),
                                   function(req,resp){

})
router.get('/logout',function(req,resp){
  req.logout();
  resp.redirect('/login');
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
