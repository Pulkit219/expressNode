var express = require("express");
var app = express();

app.get("/", function(req,resp){
  resp.send("Welcome to express");
});

app.get("/speak/:animal", function(req,resp){
	var animal = req.params.animal;
	console.log(animal);
	  resp.send("Welcome to animals" + animal);
});


app.listen(4200, function(){
  console.log("started");
})
