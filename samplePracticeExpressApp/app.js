var express= require("express");
var app = express();

app.get("/", function(req,res){
	res.send("responded");

});

app.get("/bye", function(req,res){
	res.send("goodbye");

});



app.listen(3000,function(){
	console.log("server started");
});



app.get("*", function(req,res){
	res.send("does not exists");

});