var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/blog_demo", {useMongoClient: true});

//POST Schema
var postSchema = new mongoose.Schema({
  title:String,
  content:String
});

var Post = mongoose.model('Post', postSchema);
//USER SCHEMA
var userSchema = new mongoose.Schema({
  email:String,
  name:String,
  posts:[postSchema]
});

var User = mongoose.model('User', userSchema);

//RETRIVE EXISTING User
User.findOne({name:'Pulkit'}, function(err,user)
{
  if(err)
   console.log(err);
   else {
  user.posts.push({
    title:'how to code pt2',
    content:'Just focus'
  });
  user.save(function(err,user){
      if(err)
      console.log(err);
      else {
      console.log(user);

      }
  })

   }
})

// var newUser = new User({
//   email:'pulkit@gmail.com',
//   name:'Pulkit'
// });
//
// newUser.posts.push({
//   title:"how to code",
//   content:'just focus and write'
// })
//
// newUser.save(function(err,user){
//
//   if(err)
//   console.log(err);
//   else {
//   console.log(user);
//
//   }
// });


// var newPost = new Post({
//   title:'Reflections on app',
//   name:'testing'
// });
//
// newPost.save(function(err,post){
//
//   if(err)
//   console.log(err);
//   else {
//   console.log(post);
//
//   }
// });
