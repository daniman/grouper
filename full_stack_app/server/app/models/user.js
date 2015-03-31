var mongoose = require('mongoose');

var user_schema = mongoose.Schema({
    username: String,
    email: String,
});

var User = mongoose.model('User', user_schema);
module.exports = User;
