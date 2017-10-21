
var express = require('express');
var router = express.Router({mergeParams:true});
var Campground= require('../models/campground');
var Comment = require('../models/comment');

//COMMENT ROUTES
router.get('/campgrounds/:id/comments/new',isLoggedIn,function(req,resp){
  // console.log(req.params.id);
  Campground.findById(req.params.id,function(err,campgroundFound){
    if(err)
    {
      console.log(err);
    }
      else{
        resp.render('comments/new',{campground:campgroundFound});
      }
    });
  })
router.post('/campgrounds/:id/comments',isLoggedIn,function(req,resp){
  Campground.findById(req.params.id,function(err,campgroundFound){
    if(err)
    {
      console.log(err);
      resp.redirect('/campgrounds');
    }
      else{
        // console.log(req.body.comment);
        Comment.create(req.body.comment,function(err,comment){
          if(err)
          {
            console.log(err);
          }
          else{
            console.log("USER DETAILS" + req.user);
            comment.author.id =req.user._id;
            comment.author.username=req.user.username;
            //save comment
            comment.save();
            campgroundFound.comments.push(comment);
            campgroundFound.save();
            resp.redirect('/campgrounds/'+campgroundFound._id);

          }
        });
      }
    });
});

//middleware
function isLoggedIn(req,resp,next){
  if(req.isAuthenticated()){
    return next();
  }
  resp.redirect('/login')
}
module.exports = router;
//=====================================
