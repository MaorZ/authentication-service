
function routes(app) {
	const authCheck = require('../middleware/auth-check');

	app
		// Authentication APIs
		.post('/api/signin', require('./signin'))
		.post('/api/signup', require('./signup'))
		// Token APIs
		.post('/api/token/refresh', require('./refresh-token'))
		// Indetification APIs
		.get('/api/me', authCheck, require('./me'))
		.get('/api/users/:userId', require('./user'))
		// Recovery APIs
		.post('/api/forgot', require('./forgot-pass'))
		.get('/api/resetPassword/:resetToken', require('./reset-pass-info'))
		.post('/api/resetPassword', require('./reset-pass'));
}

module.exports = routes;