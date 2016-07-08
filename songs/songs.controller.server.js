var songsRepo = require('./songs.repository.server');
var userRepo = require('../user/user.repository.server');

function getSongs(req,res) {
	songsRepo.getSongsForUser(req.user.username)
		.then(function(songs) {
			res.render('songs/songs', {
				username: req.user.username,
				songs: songs
			});
		})
		.catch(function(err) {
			res.send(err);
		});
}

function getSong(req,res) {
	Promise.all([
		songsRepo.getSong(req.params.id),
		userRepo.getAllUsers()
	]).then(function(results) {
			res.render('songs/song', {
				username: req.user.username,
				users: results[1],
				song: results[0]
			});
		})
		.catch(function(err) {
			res.send(err);
		});
}

function updateSong(req,res) {
	songsRepo.updateSong(req.params.id, req.body)
		.then(function(song) {
			console.log("SONG CONTROLLER: RENDERING");
			// Isn't this a bit fishy? getSong does not return anything, I think
			getSong(req,res);
		})
		.catch(function(err) {
			res.send(err);
		});
}

function showNewSongForm(req,res) {
	userRepo.getAllUsers()
		.then(function(users) {
			res.render('songs/newSongForm', {
				username: req.user.username,
				users: users
			});
		})
		.catch(function(err) {
			res.send(err);
		});
}

function addNewSong(req,res) {
	var data = req.body;

	console.log("SONG CONTROLLER: ADDING NEW SONG");
	var userData = req.body.users || [];
	var users = [].concat(userData); // if only one user is selecters, req.body.users is not an array
	if(users.indexOf(req.user.username) === -1) { // add current user if he/she did not select him/herself
		users.push(req.user.username);
	}

	data.users = users;

	songsRepo.createSong(data)
		.then(function(newSong) {
			return getSongs(req,res);
		});
}

module.exports = {
	getSongs: getSongs,
	getSong: getSong,
	updateSong: updateSong,
	showNewSongForm: showNewSongForm,
	addNewSong: addNewSong
};