var express =require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useMongoClient: true});

// app.set('view engine' , 'ejs');
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static('public'));


var blogschema = new mongoose.Schema({
    title: String,
    image: String,
    body:String,
    created:{type:Date,default:Date.now}
});

var Blog = mongoose.model('Blog', blogschema)

app.listen(4200, function()
{
  console.log('server started');
})
