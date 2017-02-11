var http = require('http');
var app = require('./app');

// handle the request and routing in another file
http.createServer(app.handleRequest).listen(8080);