var uuid = require('uuid');
var songDA = require('./songs.da.server');

var Song = function() {
	var songId;

	var title;
	var state;

	var users;

	var init = function(data) {
		this.songId = uuid.v1();
		this.title = data.title || "";
		this.state = "added";
		this.users = ["admin"];
	}

	var load = function(id) {
		var self = this;
		return songDA.load(id)
			.then(function(songData) {
				self.songId = songData.songId;
				self.title  = songData.title;
				self.state  = songData.state;
				self.users  = songData.users;

				return self;
			});
	}

	var save = function() {
		return songDA.save(this);
	}

	return {
		init: init, 
		load: load,
		save: save
	}
}

module.exports = Song;