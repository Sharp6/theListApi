var SongDA = function() {
	var songs = {
		test: {
			songId: "test",
			title: "test",
			users: ["admin"],
			state: "playing"
		}
	}
	
	var save = function(song) {
		return new Promise(function(resolve, reject) {
			resolve();
		});
	}

	var load = function(id) {
		return new Promise(function(resolve,reject) {
			if(songs.id) {
				resolve(songs.id);
			} else {
				reject("DA: no song found with that id.");
			}
		});
	}

	return {
		load: load,
		save: save
	}
}

// DA should be a singleton
module.exports = new SongDA();