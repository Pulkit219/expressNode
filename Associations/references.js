var Post = require('./models/post');
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/blog_demo_2", {useMongoClient: true});


//USER SCHEMA
var userSchema = new mongoose.Schema({
  email:String,
  name:String,
  posts:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Post'
    }
  ]
});
