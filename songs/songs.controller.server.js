var songsRepo = require('./songs.repository.server');

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

function showNewSongForm(req,res) {
	res.render('songs/newSongForm', {
		username: req.user.username
	});
}

function addNewSong(req,res) {
	var data = req.body;

	var users = req.body.users || [];
	users.push(req.user.username);

	data.users = users;

	songsRepo.createSong(data)
		.then(function(newSong) {
			return getSongs(req,res);	
		});
}

module.exports = {
	getSongs: getSongs,
	showNewSongForm: showNewSongForm,
	addNewSong: addNewSong
}