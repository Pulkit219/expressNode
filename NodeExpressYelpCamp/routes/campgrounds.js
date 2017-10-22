var express = require('express');
var router = express.Router();
var Campground= require('../models/campground');

//CAMPGROUND ROUTES

//INDEX ALL CAMPGROUNDS
router.get('/campgrounds', function(req, resp){

  Campground.find({},
  function(err,allcampground){
    if(err)
    console.log(err);

    else {
    resp.render('campgrounds/index',{campgrounds:allcampground});

    }
  }
  );
});


router.get('/campgrounds/new', isLoggedIn,function(req, resp){
  resp.render('campgrounds/new');
});

//SHOW
router.get('/campgrounds/:id', function(req, resp){
  Campground.findById(req.params.id).populate('comments').exec(function(err,specificCampGround){
    if(err)
    {
       console.log(err);
    }
     else {
         resp.render('campgrounds/show', {campground:specificCampGround});

        }
  });

});



router.post('/campgrounds',isLoggedIn, function(req,resp){
   var name = req.body.name;
   var url= req.body.url;
   var desc = req.body.desc;
   var author={
     id:req.user._id,
     username:req.user.username
   }
   var obj =
   {
     name:name,
     image:url,
     description:desc,
     author:author
   };
   Campground.create(obj,
   function(err,campground){
     if(err)
     console.log(err);

     else {
       console.log('created!!!');
       resp.redirect("/campgrounds");
     }
   }
   );
})

//middleware
function isLoggedIn(req,resp,next){
  if(req.isAuthenticated()){
    return next();
  }
  resp.redirect('/login')
}

module.exports = router;
