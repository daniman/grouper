var express = require('express');
var router = express.Router();
var User = require('../models/user');


/*
 * POST groupify.
 */
router.post('/', function(req, res) {
    var categories = req.body.headers;
    var students = req.body.objects;
    console.log(categories);
    console.log(students);

});

module.exports = router;
