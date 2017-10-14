
var express = require('express');
var router = express.Router();
var Campground= require('../models/campground');
var comment = require('../models/comment');

//COMMENT ROUTES
router.get('/campgrounds/:id/comments/new',isLoggedIn,function(req,resp){
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
