var passport = require('passport');
var userCtrl = require('./user.controller.server');

function userRoutes(app) {
	app.get('/', userCtrl.renderWelcome);
	app.get('/profile', passport.authenticationMiddleware(), userCtrl.renderProfile);
		
	app.post('/login', passport.authenticate('local', {
		successRedirect: '/profile',
		failureRedirect: '/'
	}));

	app.get('/signup', userCtrl.renderSignup);
	app.post('/signup', userCtrl.signupUser);

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
}

module.exports = userRoutes;