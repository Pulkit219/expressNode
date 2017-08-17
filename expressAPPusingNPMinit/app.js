var express = require("express");
var app = express();

app.get("/", function(req,resp){
  resp.send("Welcome to express");
});

app.get("/speak/:animal", function(req,resp){
	var sounds ={
		pig:"oink",
		dog:"bark",
		cat:"meow"
	}
	var animal = req.params.animal.toLowerCase();
	  resp.send("Welcome to animals" + " " + sounds[animal]);
});

app.get("/repeat/:message/:times", function(req,resp){
	var message = req.params.message;
	var times = req.params.times;
	var result ='';

	for (var i = 0; i < times; i++) {
		result+=message + '<br/>';
	}
  resp.send(result);
});

app.get("*", function(req,resp){
  resp.send("PAGE NOT FOUND");
});



app.listen(4200, function(){
  console.log("started");
})
