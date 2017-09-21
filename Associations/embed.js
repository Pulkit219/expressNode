var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/blog_demo", {useMongoClient: true});

//USER SCHEMA
var userSchema = new mongoose.Schema({
  email:String,
  name:String
});

var User = mongoose.model('User', userSchema);

//POST Schema
var postSchema = new mongoose.Schema({
  title:String,
  content:String
});

var Post = mongoose.model('Post', postSchema);

// var newUser = new User({
//   email:'johndoe@gmail.com',
//   name:'John Doe'
// });
//
// newUser.save(function(err,post){
//
//   if(err)
//   console.log(err);
//   else {
//   console.log(post);
//
//   }
// });


var newPost = new Post({
  title:'Reflections on app',
  name:'testing'
});

newPost.save(function(err,post){

  if(err)
  console.log(err);
  else {
  console.log(post);

  }
});
