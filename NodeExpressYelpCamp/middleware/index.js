// all middleware here


var middlewareObj ={};

middlewareObj.checkCampgroundOwnership =function(req,resp,next){
  if(req.isAuthenticated()){
    Campground.findById(req.params.id,function(err,foundCampground){
      if(err){
        console.log(err);
        resp.redirect("back");
      }
      else {
        if(foundCampground.author.id.equals(req.user._id))
        {
          next();
        }
        else{
          resp.redirect("back");
        }

      }
    });
  }
  else{
    resp.redirect("back");
  }
}


middlewareObj.checkCommentOwnership =function(req,resp,next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id,function(err,foundComment){
      if(err){
        console.log(err);
        resp.redirect("back");
      }
      else {
        if(foundComment.author.id.equals(req.user._id))
        {
          next();
        }
        else{
          resp.redirect("back");
        }

      }
    });
  }
  else{
    resp.redirect("back");
  }
}


middlewareObj.isLoggedIn =function(req,resp,next){
  if(req.isAuthenticated()){
    return next();
  }
  resp.redirect('/login')
}


module.exports=middlewareObj
