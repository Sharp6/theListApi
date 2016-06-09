var songsRepo = require('./songs.repository.server');

function getSongs(req,res) {
	songsRepo.getSongsForUser(req.user.username)
		.then(function(songs) {
			res.render('songs', {
				username: req.user.username,
				songs: songs
			});		
		})
		.catch(function(err) {
			res.send(err);
		});	
}

module.exports = {
	getSongs: getSongs
}