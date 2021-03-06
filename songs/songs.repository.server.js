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
	};

	var getSong = function(songId) {
		var song = songs.find(function(aSong) {
			return aSong.songId === songId;
		});
		if(song) {
			return new Promise(function(resolve,reject) {
				resolve(song);
			});
		} else {
			return songDA.load(songId)
				.then(function(songData) {
					var newSong = new Song(songData);
					songs.push(newSong);
					return newSong;
				});
		}
	};

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
	};

	var updateSong = function(songId, data) {
		return getSong(songId)
			.then(function(song) {
				if(data.status) {
					song.status = data.status;
				}

				if(data.users) {
					song.users = data.users;
				}

				if(data.author) {
					song.author = data.author;
				}

				if(data.title) {
					song.title = data.title;
				}
				
				return songDA.save(song);
			})
			.then(function(song) {
				return song;
			});
	};

	var createSong = function(data) {
		var newSong = new Song(data);
		songs.push(newSong);
		return songDA.save(newSong);
	};

	return {
		getSongsForUser: getSongsForUser,
		getSong: getSong,
		updateSong: updateSong,
		getAllSongs: getAllSongs,
		createSong: createSong
	};
};

module.exports = new SongsRepository();