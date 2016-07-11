var userRepo = require('../user/user.repository.server');

function renderWelcome(req,res) {
	res.render('user/welcome');
}

function renderProfile(req,res) {
	res.render('user/profile', {
		username: req.user.username
	});
}

function renderSignup(req,res) {
	res.render('user/signup', {

	});
}

function signupUser(req,res) {
	userRepo.createUser(req.body)
		.then(function(user) {
			renderWelcome(req,res);
		});
}

module.exports = {
	renderWelcome: renderWelcome,
	renderProfile: renderProfile,
	renderSignup: renderSignup,
	signupUser: signupUser
};