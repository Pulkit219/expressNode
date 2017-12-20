// all middleware here


var middlewareObj ={};
var Campground = require('../models/campground');
var Comment = require('../models/comment');

middlewareObj.checkCampgroundOwnership =function(req,resp,next){
  if(req.isAuthenticated()){
    Campground.findById(req.params.id,function(err,foundCampground){
      if(err || !foundCampground){
        console.log(err);
        req.flash("error", "Campground not found");
        return resp.redirect("/campgrounds");
      }
      else {

        if(foundCampground.author.id.equals(req.user._id))
        {
          next();
        }
        else{
          req.flash('error',"You don't have permission");
          resp.redirect("back");
        }

      }
    });
  }
  else{
    req.flash("error", "You must be logged in!");
    resp.redirect("back");
  }
}


middlewareObj.checkCommentOwnership =function(req,resp,next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id,function(err,foundComment){
      if(err || !foundComment){
        console.log(err);
        req.flash("error", "Comment not found");
        return resp.redirect("back");
      }
      else {
        if(foundComment.author.id.equals(req.user._id))
        {
          next();
        }
        else{
          req.flash("error", "You don't have permission");
          resp.redirect("back");
        }

      }
    });
  }
  else{
    req.flash("error", "You must be logged in!");
    resp.redirect("back");
  }
}


middlewareObj.isLoggedIn =function(req,resp,next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "You must be logged in!");
  resp.redirect('/login');
}


module.exports=middlewareObj
