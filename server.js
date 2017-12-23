var express = require('express');
var router= require('./router');
var app = express();

app.use(express.static('public'));

app.use('/api',router); 

var port= process.env.PORT || 3000;

app.listen(port,function(){
	console.log('server is running at port '+port+ "...");
});