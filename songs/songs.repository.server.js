var SongsRepository = function() {
	var songs = [
		{
			songId: "test1",
			title: "title1",
			users: ["admin", "philip"],
			status: "playing"
		}, 
		{
			songId: "test2",
			title: "title2",
			users: ["admin", "philip", "machteld", "testUser"],
			status: "practicing"
		}
	];

	var getSongsForUser = function(username) {
		return new Promise(function(resolve,reject) {
			var userSongs = songs.filter(function(song) {
				return song.users.indexOf(username) > -1;
			});
			resolve(userSongs);
		});
	}

	var getAllSongs = function() {
		return new Promise(function(resolve,reject) {
			resolve(songs);
		});
	}

	return {
		getSongsForUser: getSongsForUser,
		getAllSongs: getAllSongs
	}
}

module.exports = new SongsRepository();