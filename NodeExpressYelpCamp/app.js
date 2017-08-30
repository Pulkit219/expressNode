var express =require('express');
var app = express();
var bodyParser = require("body-parser");
var campgrounds = [
   {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
   {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
   {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
   {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
   {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
   {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
   {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"}
 ];

app.set('view engine' , 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, resp)
{
  resp.render("landing");
});

app.get('/campgrounds', function(req, resp){

   resp.render('campgrounds',{campgrounds:campgrounds });
});

app.get('/campgrounds/new', function(req, resp){
  resp.render('new');
});


app.post('/campgrounds', function(req,resp){
   var name = req.body.name;
   var url= req.body.url;
   var obj =
   {
     name:name,
     image:url
   };
   campgrounds.push(obj);

  resp.redirect("/campgrounds");
})

app.listen(4200, function()
{
  console.log('server started');
})
