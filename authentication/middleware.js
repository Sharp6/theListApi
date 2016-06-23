function authenticationMiddleware() {
	return function(req,res,next) {
		if(req.isAuthenticated()) {
			return next();
		}
		console.log("AUTHMIDDLE: NOT AUTHENTICATED");
		res.redirect('/');
	};
}

module.exports = authenticationMiddleware;