var express = require('express');
var router = express.Router();
var db = require('monk')('127.0.0.1:27017/test');
// set default collection, collection object
var userData = db.get('user-data');

// var mongo = require('mongodb').MongoClient;
// var objectId = require('mongodb').ObjectID;
// var assert = require('assert');

// mongodb server port
// var url = 'mongodb://127.0.0.1:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
	let resultArray = [];
	var data = userData.find({}); // search for a specific object
	// listen on event, onSuccess, pass it to the view
	data.on('success', function(docs) {
		res.render('index', {items: docs});
	});
});

router.post('/insert', function(req, res, next) {
	let item = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	};
	// userData collection representation
	// var insert = userData.insert(item); and then listen for success or error
	userData.insert(item);

	res.redirect('/');
});

router.post('/update', function(req, res, next) {
	let item = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	};

	// it is id because the input has a name id
	// <label for="id">ID</label>
    // <input type="text" id="id" name="id">
	let id = req.body.id;

	// userData.update({'_id': db.id(id)}, item});	
	userData.updateById(id, item);
});

router.post('/delete', function(req, res, next) {
	let id = req.body.id;

	userData.remove({'_id': db.id(id)});
	userData.removeById(id);	
});

module.exports = router;
