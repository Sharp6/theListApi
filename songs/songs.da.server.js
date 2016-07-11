var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SongSchema = new Schema({
	songId: String,
	title: String,
	status: String,
	users: [ String ]
});

var songModel = mongoose.model('Song', SongSchema);

var SongDA = function() {
	var self = this;
	
	var save = function(song) {
		return new Promise(function(resolve, reject) {
			songModel.findOne({ songId: song.songId }).exec(function(err,doc) {
				if(err) {
					reject(err);
					return;
				}
				if(doc) {
					// Song already exists, an update should happen.
					console.log("SONGDA: UPDATING");

					// This feels wrong, I already did this in the repository... Could it be that I can assume here that all fields need to be updated?
					if(song.status) {
						doc.status = song.status;
					}
					if(song.users) {
						doc.users = song.users;
					}
					
					doc.save(function(err) {
						if(err) {
							reject(err);
						} else {
							resolve(song);
						}
					});
				} else {
					var newSong = new songModel();

					newSong.songId = song.songId;
					newSong.title = song.title;
					newSong.status = song.status;
					newSong.users = song.users;

					newSong.save(function(err) {
						if(err) {
							reject(err);
						} else {
							resolve(newSong);
						}
					});
				}
			});
		});
	};

	var load = function(id) {
		return new Promise(function(resolve,reject) {
			songModel.findOne({ songId: songId }).exec(function(err,doc) {
				if(err) {
					reject(err);
					return;
				} else if(doc) {
					resolve(doc);
				} else {
					reject("No song found with that id.");
				}
			});
		});
	};

	var loadAll = function() {
		return new Promise(function(resolve,reject) {
			songModel.find().exec(function(err,doc) {
				if(err) {
					reject(err);
				} else {
					resolve(doc);
				}
			});
		});
	};

	return {
		load: load,
		save: save,
		loadAll: loadAll
	};
};

// DA should be a singleton
module.exports = new SongDA();