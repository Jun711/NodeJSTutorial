var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// errors: req.session.errors will be empty at the beginning
  res.render('index', { title: 'Form Validation', success: req.session.success, errors: req.session.errors });
  // clear the errors after we send to the front-end
  req.session.erros = null;
  req.session.success = null;
});

router.post('/submit', function(req, res, next) {
	// Check validity, 
	// first param is the name of an input field, 
	// the second param is the error msg
	// a lot of built-in validators
	req.check('email', 'Invalid email address').isEmail();
	req.check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirmPassword);

	let errors = req.validationErrors();
	if (errors) {
		req.session.errors =  errors;
		req.session.success = false;
	} else {
		req.session.success = true;
	}
	res.redirect('/');
})

module.exports = router;
