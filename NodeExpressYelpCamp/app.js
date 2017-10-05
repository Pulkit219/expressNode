var express =require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require('passport');
var LocalStrategy = require('passport-local');
var Campground = require('./models/campground');
var User = require('./models/user');
var Comment = require('./models/comment');
var seedDB    = require('./seeds');


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useMongoClient: true});
seedDB();

//PASSPORT CONFIGURATION
//===========================================
app.use(require('express-session')({
  secret:'SOme secret code',
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//==========================================================

app.set('view engine' , 'ejs');
app.use(express.static(__dirname  + '/public'));
app.use(bodyParser.urlencoded({extended:true}));


// Campground.create(
//    {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",description:'awesome place to visit'},
// function(err,campground){
//   if(err)
//   console.log(err);
//
//   else {
//     console.log('created!!!');
//
//   }
// }
// );

// var campgrounds = [
//    {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//    {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//    {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
//    {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//    {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//    {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
//    {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"}
//  ];




//ROUTES

app.get('/', function(req, resp)
{
  resp.render("landing");
});


app.get('/campgrounds', function(req, resp){

  Campground.find({},
  function(err,allcampground){
    if(err)
    console.log(err);

    else {
    resp.render('campgrounds/index',{campgrounds:allcampground });

    }
  }
  );
});


app.get('/campgrounds/new', function(req, resp){
  resp.render('campgrounds/new');
});

//SHOW
app.get('/campgrounds/:id', function(req, resp){
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



app.post('/campgrounds', function(req,resp){
   var name = req.body.name;
   var url= req.body.url;
   var desc = req.body.desc;
   var obj =
   {
     name:name,
     image:url,
     description:desc
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
//====================================
//COMMENT ROUTES
app.get('/campgrounds/:id/comments/new',function(req,resp){
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
app.post('/campgrounds/:id/comments',function(req,resp){
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
//=====================================


//AUTH ROUTES
//=====================================================
//show registration form
app.get('/register',function(req,resp){
  resp.render('register');
})
//handle sign up logic
app.post('/register',function(req,resp){
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
app.get('/login',function(req,resp){
  resp.render('login');
})

app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login'
                                   }),
                                   function(req,resp){

})

//=====================================================

app.listen(4200, function()
{
  console.log('server started');
})
