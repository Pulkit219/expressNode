var express = require('express');
var app =express();
var request = require('request');
app.set('view engine', 'ejs');



app.get('/',function(req,resp)
{
  resp.render('search');
});

app.get('/results', function(req,resp){
  request('http://www.omdbapi.com/?s=king&apikey=thewdb',function(error,response,body)
{
  if(!error && response.statusCode == 200)
  {var data = JSON.parse(body);
    resp.render('results', {data:data});
  }
});
});


app.listen(4200,function(){
  console.log('server started');
})
