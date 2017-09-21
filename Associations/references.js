var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/blog_demo_2", {useMongoClient: true});
var Post = require('./models/post');
var User = require('./models/user');

// User.create(
//   {
//     email:'pulkit@gmail.com',
//     name:'Pulkit'
//   }
// );
// Post.create(
//   {
//     title:'Testing 3 ',
//     content:'Testing 3Testing 3Testing 3Testing 3Testing 3Testing 3Testing 3Testing 3'
//   },function(err,post)
//   {
//     if(err)
//      console.log(err);
//      else {
//        User.findOne({name:'Pulkit'},function(err,userFound){
//          if(err)
//           console.log(err);
//           else {
//             {
//               userFound.posts.push(post);
//               userFound.save(function(err,data){
//                 if(err)
//                 console.log(err);
//                 else{
//                   console.log(data);
//                 }
//               })
//             }
//           }
//        })
//      }
//   }
// );

User.findOne({name:'Pulkit'}).populate('posts').exec(function(err,user){
  if(err){
    console.log(err);
  }
  else{
    console.log(user);
  }
})
