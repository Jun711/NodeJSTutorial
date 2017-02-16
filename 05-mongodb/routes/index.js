var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

// mongodb server port
var url = 'mongodb://127.0.0.1:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
	let resultArray = [];
	mongo.connect(url, function(err, db) {
		assert.equal(null, err);
		// all the entries in this collection
		let cursor = db.collection('user-data').find();
		cursor.forEach(function(doc, err) {
			assert.equal(null, err);
			resultArray.push(doc);
		}, function() {
			db.close();
			// items is the variable name used in index.hbs
			res.render('index', {items: resultArray});
		});
	});
});

router.post('/insert', function(req, res, next) {
	let item = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	};

	mongo.connect(url, function(err, db) {
		// check if we don't have an error
		assert.equal(null, err);
		// db has multiple collections (same as multiple tables in sql db)
		db.collection('user-data').insertOne(item, function(err, result) {
			assert.equal(null, err);
			console.log('Item inserted');
			db.close();
		});
	});

	res.redirect('/');
});

router.post('/update', function(req, res, next) {

});

router.post('/delete', function(req, res, next) {

});

module.exports = router;
