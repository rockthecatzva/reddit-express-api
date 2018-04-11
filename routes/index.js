var express = require('express');
var router = express.Router();

var post_controller = require('../controllers/postController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/reddit/top/:subreddit/:timeperiod/:count', post_controller.top_posts);

module.exports = router;
