var uuid = require('uuid');
var songDA = require('./songs.da.server');

var Song = function(data) {
	this.songId = data.songId || uuid.v1();
	this.title  = data.title  || "";
	this.status = data.status || "added";
	
	var dataUsers = data.users || [];
	this.users  = [ "admin" ].concat(dataUsers);
}

module.exports = Song;