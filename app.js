// it is a file that nodejs will execute
var http = require('http'); // import http from 'http';
var fs = require('fs'); // filesystem module

// request and response arguments are passed into by nodejs when there is a req
function onRequest(request, response) {
	response.writeHead(200, {'Content-Type': 'text/html'}); // status ok
	// ./ indicates it is in the same folder
	fs.readFile('./index.html', null, function(error, data) {
		if (error) {
			response.writeHead(404);
			response.write('File not found!');
		} else {
			response.write(data);
		}
		response.end(); // response.end has to be here so that it execute after the callback function is done
	}); 
	// response.write('Hello World: ');
	// response.end(); // to make clear it is done handling the response
}

http.createServer(onRequest).listen(8000);
