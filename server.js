// it is a file that nodejs will execute
var http = require('http'); // import http from 'http';
 // it is a core module of nodejs so it comes in default
var module1 = require('./module1');
var module2 = require('./module2');

// request and response arguments are passed into by nodejs when there is a req
function onRequest(request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain'}); // status ok
	response.write('Hello World: ');
	response.write(module2.myVariable);
	module2.myFunction(); // will see it two times on console if we have more than one browser window open?
	response.end(); // to make clear it is done handling the response
}

// create and a server and listen to incoming requests at port 8000
// onRequest is a reference to the function that we want to execute
http.createServer(onRequest).listen(8000);
