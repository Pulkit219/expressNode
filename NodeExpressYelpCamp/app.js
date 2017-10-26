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
var commentRoutes = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds');
var indexRoutes = require('./routes/index');
var methodOverride = require('method-override');


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useMongoClient: true});
// seedDB();

//PASSPORT CONFIGURATION
//===========================================
app.use(require('express-session')({
  secret:'SOme secret code',
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//==========================================================
app.use(function(req,resp,next){
  resp.locals.currentUser = req.user;
  next();
})
app.set('view engine' , 'ejs');
app.use(express.static(__dirname  + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(indexRoutes);


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







//=====================================================

app.listen(4200, function()
{
  console.log('server started');
})
