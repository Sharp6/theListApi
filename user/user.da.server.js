var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
	userId: String,
	username: String,
	password: String
});

var userModel = mongoose.model('User', UserSchema);

var UserDA = function() {
	var load = function(id) {
		return new Promise(function(resolve,reject) {
			userModel.findOne({ userId: userId }).exec(function(err,doc) {
				if(err) {
					reject(err);
					return;
				} else if(doc) {
					resolve(doc);
				} else {
					reject("No user found with that id.");
				}
			});
		});
	};

	var loadByName = function(username) {
		return new Promise(function(resolve,reject) {
			userModel.findOne({ username: username }).exec(function(err,doc) {
				if(err) {
					reject(err);
					return;
				} else if(doc) {
					resolve(doc);
				} else {
					reject("No user found with that username.");
				}
			});
		});
	};

	var loadAll = function() {
		return new Promise(function(resolve,reject) {
			userModel.find().exec(function(err,doc) {
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
		loadAll: loadAll,
		loadByName: loadByName
	};

};

module.exports = new UserDA();