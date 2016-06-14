var userDA = require('./user.da.server');
var User = require('./user.model.server');

var UserRepository = function() {
	var users = [];

	var getAllUsers = function() {
		users = [];
		return userDA.loadAll()
			.then(function(userData) {
				return userData
					.map(function(data) {
						var newUser = new User(data);
						user.push(newUser);
						return newUser;
					});
			});
	};

	var getUserByName = function(username) {

	};

	return {
		getAllUsers: getAllUsers,
		getUserByName: getUserByName
	};
};

module.exports = new UserRepository();