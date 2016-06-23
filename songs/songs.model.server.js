var uuid = require('uuid');
var songDA = require('./songs.da.server');

var Song = function(data) {
	this.songId = data.songId || uuid.v1();
	this.title  = data.title  || "";
	this.status = data.status || "added";
	
	this.users = data.users || [];
};

module.exports = Song;