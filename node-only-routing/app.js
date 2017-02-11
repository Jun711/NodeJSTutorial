var url = require('url');
var fs = require('fs'); // filesystem module

// request and response arguments are passed into by nodejs when there is a req
function renderHTML(path, response) {
	// ./ indicates it is in the same folder
	fs.readFile(path, null, function(error, data) {
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

module.exports = {
	handleRequest: function(request, response) {
		response.writeHead(200, {'Content-Type': 'text/html'});

		// routing to login or main page
		// / root directory
		// /login login 

		// parse takes in a string, url property of the request object
		var path = url.parse(request.url).pathname; 
		switch (path) {
			case '/':
				renderHTML('./index.html', response);
			case '/login':
				renderHTML('./login.html', response);
				break;
			default:
				response.writeHead(404);
				response.write('page not found!');
				response.end();
		}
	}
};