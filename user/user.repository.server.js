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
						users.push(newUser);
						return newUser;
					});
			});
	};

	var getUserByName = function(username) {
		return new Promise(function(resolve,reject) {
			var user = users.find(function(aUser) {
				return aUser.username === username;
			});
			if(user) {
				resolve(user);
			} else {
				userDA.loadByName(username)
					.then(function(userData) {
						user = new User(userData);
						users.push(user);
						resolve(user);
					})
					.catch(function(err) {
						reject(err);
					});
			}
		});
	};

	return {
		getAllUsers: getAllUsers,
		getUserByName: getUserByName
	};
};

module.exports = new UserRepository();