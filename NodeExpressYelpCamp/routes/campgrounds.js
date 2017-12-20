var express = require('express');
var router = express.Router();
var Campground= require('../models/campground');
var middleware =require('../middleware');

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


router.get('/campgrounds/new', middleware.isLoggedIn,function(req, resp){
  resp.render('campgrounds/new');
});

//SHOW
// router.get("/:id", function(req, res){
//     //find the campground with provided ID
//     Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
//         if(err || !foundCampground){
//             console.log(err);
//             req.flash('error', 'Sorry, that campground does not exist!');
//             return res.redirect('/campgrounds');
//         }
//         console.log(foundCampground)
//         //render show template with that campground
//         res.render("campgrounds/show", {campground: foundCampground});
//     });
// });

router.get('/campgrounds/:id', function(req, resp){
  Campground.findById(req.params.id).populate('comments').exec(function(err,specificCampGround){
    if(err || !specificCampGround)
    {
       console.log(err);
       req.flash("error","Campground not found");
        resp.redirect("back");
    }
     else {
         resp.render('campgrounds/show', {campground:specificCampGround});

        }
  });

});



router.post('/campgrounds',middleware.isLoggedIn, function(req,resp){
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
//EDIT CAMPGROUND
router.get('/campgrounds/:id/edit',middleware.checkCampgroundOwnership,function(req,resp){

    Campground.findById(req.params.id,function(err,foundCampground){

      resp.render('campgrounds/edit', {campground:foundCampground});

    })
})
//UPDATE CAMGROUND ROUTE
router.put('/campgrounds/:id',middleware.checkCampgroundOwnership,function(req,resp){
  Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCamground){

      resp.redirect('/campgrounds/'+req.params.id);

});
})

//DELETE CAMPGROUND
router.delete('/campgrounds/:id',middleware.checkCampgroundOwnership,function(req,resp){
  Campground.findByIdAndRemove(req.params.id,function(err){

      resp.redirect('/campgrounds');

});

})

module.exports = router;
//middleware

/*
function isLoggedIn(req,resp,next){
  if(req.isAuthenticated()){
    return next();
  }
  resp.redirect('/login')
}
//=============================================
function checkCampgroundOwnership(req,resp,next)
{
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

}*/
