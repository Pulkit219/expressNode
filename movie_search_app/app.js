var express = require('express');
var app =express();
var request = require('request');


app.get('/results', function(req,resp){
  request('http://www.omdbapi.com/?s=harry&apikey=thewdb',function(error,response,body)
{
  if(!error && response.statusCode == 200)
  {var results = JSON.parse(body);
    resp.send(results['Search'][0]);
  }
});
});


app.listen(4200,function(){
  console.log('server started');
})
