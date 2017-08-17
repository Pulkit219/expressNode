var express= require("express");
var app  = express();


app.get('/', function(req,resp){
	resp.render('home.ejs');

})

app.get('/testing/:test', function(req,resp){
	var test =req.params.test;
	resp.render('test.ejs',{thingvar:test});

})

app.get('/posts', function(req,resp){
	var posts =[
	{title:"post1", author:"pulkit"},
	{title:"post2", author:"pulkit"},
	{title:"post3", author:"pulkit"},

	];
	resp.render('posts.ejs',{postvar:posts});

})

app.listen(4200, function(){
	console.log("started");
})
