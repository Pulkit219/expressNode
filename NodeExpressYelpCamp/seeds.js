var mongoose = require("mongoose");
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var data =[
  {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg", description:'testing1testing1testing1testing1'},
     {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",description:'Testing2Testing2Testing2Testing2Testing2'},
      {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg", description:'testing3testing3testing3testing3'}
]

function seedDB()
//REMOVE ALL CAMPGROUNDS
{
  Campground.remove({},function(err){
    if(err)
    console.log(err);
    else{
      console.log('DB cleared');
      console.log('adding campgrounds');
      //add a few campgrounds
      data.forEach(function(seed){
        Campground.create(seed,function(err,campground){
          if(err)
          console.log(err);
          else{
            console.log('data added');
            console.log('adding comment for data');
            Comment.create({
              text:'Comment1Comment1Comment1Comment1Comment1',
              author:'Pulkit'
            },function(err,comment){
              if(err)
              console.log(err);
              else{
                campground.comments.push(comment);
                campground.save();
              }
            })
          }
        });
      });
    }
  });

}

module.exports =seedDB;
