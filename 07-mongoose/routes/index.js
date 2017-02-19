var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('127.0.0.1:27017/test');
var Schema = mongoose.Schema;

// it will validate if the input is in the right format
// it is a blueprint or a layout
var userDataSchema = new Schema({
	title: {type: String, required: true}, // it cannot be empty or null
	content: String,
	author: String
}, {collection: 'user-data'}); // pass an object to specify the collection

// actual model of the schema which we can use to instantiate objects
// first argument is the name of the model
// it will create a collection called 'UserDatas'
var UserData = mongoose.model('UserData', userDataSchema);

// mongodb server port
var url = 'mongodb://127.0.0.1:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
	UserData.find()
		.then(function(doc) {
			res.render('index', {items:doc});
		})
});

router.post('/insert', function(req, res, next) {
	// it has the same structure as the schema
	let item = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	};

	var data = new UserData(item);
	data.save();
	
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

	UserData.findById(id, function(err, doc) {
		if (err) {
			console.error('error, no entry found');
		}
		doc.title = req.body.title;
		doc.content = req.body.content;
		doc.author = req.body.author;
		doc.save();
	});
	res.redirect('/');
});

router.post('/delete', function(req, res, next) {
	let id = req.body.id;
	UserData.findByIdAndRemove(id).exec();
	res.redirect('/');
});

module.exports = router;
