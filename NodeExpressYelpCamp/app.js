var express =require('express');
var app = express();
app.set('view engine' , 'ejs');

app.get('/', function(req, resp)
{
  resp.render("landing");
});

app.get('/campgrounds', function(req, resp){
  var campgrounds = [
     {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
     {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
     {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
     {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"}
   ];
   resp.render('campgrounds',{campgrounds:campgrounds });
});


app.listen(4200, function()
{
  console.log('server started');
})
