var express = require('express');
var router = express.Router();

//Redirects to the Home page
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

module.exports = router;