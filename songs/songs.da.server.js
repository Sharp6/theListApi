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
			resolve();
		});
	}

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
	}

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
	}

	return {
		load: load,
		save: save,
		loadAll: loadAll
	}
}

// DA should be a singleton
module.exports = new SongDA();