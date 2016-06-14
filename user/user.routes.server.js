var passport = require('passport');
var userCtrl = require('./user.controller.server');

function userRoutes(app) {
	app.get('/', userCtrl.renderWelcome);
	app.get('/profile', passport.authenticationMiddleware(), userCtrl.renderProfile);
		
	app.post('/login', passport.authenticate('local', {
		successRedirect: '/profile',
		failureRedirect: '/'
	}));
}

module.exports = userRoutes;