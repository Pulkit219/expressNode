var express= require("express");
var app  = express();
var bodyParser =require('body-parser');
	var friends =['pulkit', 'pierre', 'frankie'];


app.use(bodyParser.urlencoded({extended: true}));

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
resp.render('friends',{friendsvar:friends});
});

app.post('/addfriend',function(req,resp){

	var newfriend =req.body.newfriend;
	friends.push(newfriend);
	console.log(req.body.newfriend);
 resp.redirect('/friends');
});;

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
