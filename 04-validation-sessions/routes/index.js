var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// errors: req.session.errors will be empty at the beginning
  res.render('index', { title: 'Form Validation', success: false, errors: req.session.errors });
  // clear the errors after we send to the front-end
  req.session.erros = null;
});

router.post('/submit', function(req, res, next) {
	// Check validity 
	
})

module.exports = router;
