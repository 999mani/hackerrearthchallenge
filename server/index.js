var express = require('express');
ISPData = require('./data');
var app = express();
var path = require('path');
var url = require('url');


app.set('port', 8080);
app.use(express.static(path.join(__dirname, '../client/build')));


app.get('/loaddata',function(req,res){
	res.header('Access-Control-Allow-Origin', '*');
	res.end(JSON.stringify(ISPData));
})

app.get('/search',function(req,res){
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	
	if(req.query.key)
	{
		searchData(req.query.key);
		res.header('Access-Control-Allow-Origin', '*');
		res.end(searchData(req.query.key));
	}
	
})

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})


function searchData(key) {

	var data = ISPData;

	var dataToSend = new Array();
	ISPData.forEach(function(item){
	    var patt = new RegExp(key,"i");
	    if(patt.test(item.name) ||patt.test(item.lowest_price) || patt.test(item.description) || patt.test(item.contact_no) || patt.test(item.email))
	    {
	    	dataToSend.push(item);
	    }
	});
	return JSON.stringify(dataToSend);
}


var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});

