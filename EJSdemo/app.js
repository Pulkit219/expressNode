var express= require("express");
var app  = express();


app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/', function(req,resp){
	resp.render('home');

})

app.get('/testing/:test', function(req,resp){
	var test =req.params.test;
	resp.render('test',{thingvar:test});

})

app.get('/friends', function(req,resp){

	var friends =['pulkit', 'pierre', 'frankie'];
	resp.render('friends',{friendsvar:friends});

})

app.get('/posts', function(req,resp){
	var posts =[
	{title:"post1", author:"pulkit"},
	{title:"post2", author:"pulkit"},
	{title:"post3", author:"pulkit"},

	];
	resp.render('posts',{postvar:posts});

})

app.listen(4200, function(){
	console.log("started");
})
