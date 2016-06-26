var passport = require('passport');
var songsCtrl = require('./songs.controller.server');

function songRoutes(app) {
	app.get('/songs', passport.authenticationMiddleware(), songsCtrl.getSongs);
	
	app.get('/songs/:id', passport.authenticationMiddleware(), songsCtrl.getSong);
	app.post('/songs/:id', passport.authenticationMiddleware(), songsCtrl.updateSong);
	
	app.get('/addSong', passport.authenticationMiddleware(), songsCtrl.showNewSongForm);
	app.post('/addSong', passport.authenticationMiddleware(), songsCtrl.addNewSong);
}

module.exports = songRoutes;