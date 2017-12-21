
var express = require('express');
var router = express.Router({mergeParams:true});
var Campground= require('../models/campground');
var Comment = require('../models/comment');
var middleware =require('../middleware');

//COMMENT ROUTES
router.get('/campgrounds/:id/comments/new',middleware.isLoggedIn,function(req,resp){
  // console.log(req.params.id);
  Campground.findById(req.params.id,function(err,campgroundFound){
    if(err || !campgroundFound)
    {
      req.flash("error", "Campground not found");
      return resp.redirect('back');
    }
      else{
        resp.render('comments/new',{campground:campgroundFound});
      }
    });
  })
router.post('/campgrounds/:id/comments',middleware.isLoggedIn,function(req,resp){
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
            req.flash("success", "Comment added successfully");
            resp.redirect('/campgrounds/'+campgroundFound._id);

          }
        });
      }
    });
});

//EDIT ROUTE
router.get('/campgrounds/:id/comments/:comment_id/edit',middleware.checkCommentOwnership,function(req,resp){
      Campground.findById(req.params.id, function(err,foundCampground){
        if(err || !foundCampground)
        {
          req.flash("error", "Campground not found");
          return resp.redirect('back');
        }
        Comment.findById(req.params.comment_id, function(err,foundComment){
          if(err){
            resp.redirect('back');
          }
          else{
            resp.render("comments/edit",{campground_id:req.params.id, comment:foundComment});
          }
        });
      });


})
//UPDATE ROUTE
router.put('/campgrounds/:id/comments/:comment_id',middleware.checkCommentOwnership,function(req,resp){
  Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedCamground){
    if(err)
    {
      resp.redirect('back');
    }
    else{
      req.flash("success", "Comment updated");
      resp.redirect('/campgrounds/'+req.params.id);
    }
  })
})
//DELETE ROUTE
router.delete('/campgrounds/:id/comments/:comment_id',middleware.checkCommentOwnership,function(req,resp){
Comment.findByIdAndRemove(req.params.comment_id,function(err){
  if(err){
    resp.redirect('back');
  }
  else{
    req.flash("success", "Comment removed successfully");
    resp.redirect('/campgrounds/'+req.params.id);
  }
})
})
//middleware
// function isLoggedIn(req,resp,next){
//   if(req.isAuthenticated()){
//     return next();
//   }
//   resp.redirect('/login')
// }
module.exports = router;
//=====================================
