// it is a file that nodejs will execute
var http = require('http'); // import http from 'http';

// request and response arguments are passed into by nodejs when there is a req
function onRequest(request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain'}); // status ok
	response.write('Hello World');
	response.end(); // to make clear it is done handling the response
}

// create and a server and listen to incoming requests at port 8000
http.createServer(onRequest).listen(8000);
