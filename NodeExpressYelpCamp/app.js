var express =require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useMongoClient: true});

//SCHEMA
var campgroundschema = new mongoose.Schema({
    name: String,
    image: String,
    description:String
});

var Campground = mongoose.model('Campground',campgroundschema );
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


app.set('view engine' , 'ejs');

app.use(bodyParser.urlencoded({extended:true}));


//ROUTES

app.get('/', function(req, resp)
{
  resp.render("landing");
});


app.get('/campgrounds', function(req, resp){

  //  resp.render('campgrounds',{campgrounds:campgrounds });
  Campground.find({},
  function(err,allcampground){
    if(err)
    console.log(err);

    else {
    resp.render('index',{campgrounds:allcampground });

    }
  }
  );
});


app.get('/campgrounds/new', function(req, resp){
  resp.render('new');
});

app.get('/campgrounds/:id', function(req, resp){
  Campground.findById(req.params.id, function(err,specificCampGround){
    if(err)
     console.log(err);

     else {
         resp.render('show', {campground:specificCampGround});
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
  //  campgrounds.push(obj);


})



app.listen(4200, function()
{
  console.log('server started');
})
