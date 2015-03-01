var express = require('express');
var router = express.Router();
var User = require('../models/user');


/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    User.findOne({}, function (err, items) {
        res.json(items);
    });
});

module.exports = router;
