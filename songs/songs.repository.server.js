var songDA = require('./songs.da.server');
var Song = require('./songs.model.server');

var SongsRepository = function() {
	var songs = [];

	var getSongsForUser = function(username) {
		return getAllSongs()
			.then(function() {
				return songs
					.filter(function(song) {
						return song.users.indexOf(username) > -1;
					});
			});
	}

	var getAllSongs = function() {
		songs = [];
		return songDA.loadAll()
			.then(function(songData) {
				return songData
					.map(function(data) {
						var newSong = new Song(data);
						songs.push(newSong);
						return newSong;
					});
			});
	}

	var createSong = function(data) {
		var newSong = new Song(data);
		songs.push(newSong);
		return songDA.save(newSong);
	}

	return {
		getSongsForUser: getSongsForUser,
		getAllSongs: getAllSongs,
		createSong: createSong
	}
}

module.exports = new SongsRepository();