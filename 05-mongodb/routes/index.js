var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
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
	let item = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	};

	// it is id because the input has a name id
	// <label for="id">ID</label>
    // <input type="text" id="id" name="id">
	let id = req.body.id;

	mongo.connect(url, function(err, db) {
		// check if we don't have an error
		assert.equal(null, err);
		
		// strongly typed and thus needs ID to be an ObjectId object, set will update with the specified item
		db.collection('user-data').updateOne({'_id': objectId(id)}, {$set: item}, function(err, result) {
			assert.equal(null, err);
			console.log('Item updated');
			db.close();
		});
	});
});

router.post('/delete', function(req, res, next) {
	let id = req.body.id;

	mongo.connect(url, function(err, db) {
		// check if we don't have an error
		assert.equal(null, err);
		
		// strongly typed and thus needs ID to be an ObjectId object, set will update with the specified item
		db.collection('user-data').deleteOne({'_id': objectId(id)}, function(err, result) {
			assert.equal(null, err);
			console.log('Item deleted');
			db.close();
		});
	});
});

module.exports = router;
