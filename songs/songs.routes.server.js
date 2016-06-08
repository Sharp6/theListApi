var passport = require('passport');
var songsCtrl = require('./songs.controller.server');

function songRoutes(app) {
	app.get('/songs/', passport.authenticationMiddleware(), songsCtrl.getSongs);
}

module.exports = songRoutes;