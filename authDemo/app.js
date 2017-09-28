var express =require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/auth_app", {useMongoClient: true});
app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({extended:true}));





//ROUTES

app.get('/', function(req, resp)
{
  resp.render("home");
});



app.listen(4200, function()
{
  console.log('server started');
})
