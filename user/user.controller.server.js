function renderWelcome(req,res) {
	res.render('user/welcome');
}

function renderProfile(req,res) {
	res.render('user/profile', {
		username: req.user.username
	});
}

module.exports = {
	renderWelcome: renderWelcome,
	renderProfile: renderProfile
}