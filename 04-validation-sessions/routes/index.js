var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', condition: false, anyArray: [1,2,3] });
});

route.get('/test/:id', function(req, res, next) {
	// we can access id via params.id because it was passed in via the url
	// output is a variable that we can access via our templating engine
	res.render('test', {output: req.params.id}); 
});

// submitting a form
router.post('/test/submit', function(req, res, next) {
	var id = req.body.id;
	res.redirect('/test/' + id);
});

module.exports = router;
