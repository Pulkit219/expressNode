var express =require('express');
var app = express();
var bodyParser = require("body-parser");
var methodOverrride = require('method-override');
var expressSanitizer = require('express-sanitizer');
var mongoose = require("mongoose");

// mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useMongoClient: true});

app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(express.static('public'));
app.use(methodOverrride("_method"));



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
//   body:'This is my first blog '..
// });

app.get('/',(req,resp)=>{
  resp.redirect('/blogs');
})

//INDEX ROUTE
app.get('/blogs', function(req, resp){
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

//NEW ROUTE
app.get('/blogs/new', function(req, resp){
  resp.render('new');
});

//POST ROUTE
app.post('/blogs', function(req,resp){
 //create blog
 req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, (err,newBlog)=>{
    if(err)
    {
      console.log(err);
      resp.render('new');
    }
    else {
    resp.redirect('/blogs');
    }

  })
});

//SHOW ROUTE
app.get('/blogs/:id', function(req,resp){
 //create blog
  Blog.findById(req.params.id, (err,BlogFound)=>{
    if(err)
    {
      console.log(err);
      resp.redirect('/blogs');
    }
    else {
      resp.render('show', {blog:BlogFound});
    }

  })
});
//EDIT ROUTE
app.get('/blogs/:id/edit',(req,resp)=>
{
  Blog.findById(req.params.id, (err,BlogFound)=>{
    if(err)
    {
      console.log(err);
      resp.redirect('/blogs');
    }
    else {
      resp.render('edit', {blog:BlogFound});
    }

  })
})


//UPDATE/PUT ROUTE
app.put('/blogs/:id', function(req,resp){
   req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,editedBlog) {
    if(err)
    {
      resp.redirect('/blogs');
    }
    else {
      resp.redirect('/blogs/'+req.params.id );
    }
  })
});


//DELETE ROUTE
app.delete('/blogs/:id',function(req,resp)
{
  Blog.findByIdAndRemove(req.params.id,function(err)
{
  if(err)
  {
    resp.redirect('/blogs');
  }
  else {
    resp.redirect('/blogs' );
  }
})
})

app.listen(4200, function()
{
  console.log('server started');
})
