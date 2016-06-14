var uuid = require('uuid');

var User = function(data) {
	this.userId = data.userId || uuid.v1();
	this.username  = data.username  || "";
	this.password = data.password || "password";
};

module.exports = User;