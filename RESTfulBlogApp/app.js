var express =require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useMongoClient: true});

app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


var blogschema = new mongoose.Schema({
    title: String,
    image: String,
    body:String,
    created:{type:Date,default:Date.now}
});

var Blog = mongoose.model('Blog', blogschema)
// Blog.create({
//   title:'testing',
//   image:'https://static.pexels.com/photos/573239/pexels-photo-573239.jpeg',
//   body:'This is my first blog '
// });

app.get('/',(req,resp)=>{
  resp.redirect('/blogs');
})


app.get('/blogs', function(req, resp){

  //  resp.render('campgrounds',{campgrounds:campgrounds });
  Blog.find({},
  function(err,allblogs){
    if(err)
    console.log(err);

    else {
    resp.render('index',{blogs:allblogs });

    }
  }
  );
});

app.listen(4200, function()
{
  console.log('server started');
})
