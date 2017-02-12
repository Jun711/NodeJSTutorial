var express = require('express');
var router = express.Router();

// even though it doesn't get app.use('/users', users);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/detail', function(req, res, next) {
  res.send('detail');
});

module.exports = router;
