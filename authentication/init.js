var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userRepo = require('../user/user.repository.server');

var authenticationMiddleware = require('./middleware');

function findUser(username, cb) {
	var user = userRepo.getUserByName(username)
		.then(function(user) {
			console.log("AUTHMIDDLE: GOT USERNAME", username);
			console.log("AUTHMIDDLE: GOT USER", user);

			if(username === user.username) {
				return cb(null, user);
			}	else {
				return cb(null);
			}
		});
}

passport.serializeUser(function (user, cb) {
	cb(null, user.username);
});

passport.deserializeUser(function (username, cb) {
	findUser(username, cb);
});

function initPassport() {
	passport.use(new LocalStrategy(function(username,password,done) {
		findUser(username, function(err,user) {
			if(err) {
				return done(err);
			} else if(!user) {
				return done(null, false);
			} else if(password !== user.password) {
				return done(null, false);
			} else {
				return done(null, user);
			}
		});
	}));
	passport.authenticationMiddleware = authenticationMiddleware;
}

module.exports = initPassport;