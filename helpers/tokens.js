const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../config');

function verifyToken(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, config.jwtSecret, (err, decoded) => {
			if (err) {
				// the 401 code is for unauthorized status
				reject(err);
			}

			const userId = decoded.sub;

			// check if a user exists
			return User.findById(userId, (userErr, user) => {
				if (userErr || (!user && user.tokenCreated === (new Date(decoded.created)))) {
					return reject();
				}
				resolve(user);
			});
		});
	});
}

function verifyRefreshToken(user, refreshToken) {
	return new Promise((resolve, reject) => {
		jwt.verify(refreshToken, config.refreshTokenSecret, (err, decoded) => {
			if (err) {
				// the 401 code is for unauthorized status
				reject(err);
			}

			const userId = decoded.sub;

			if (user._id.toString() === userId && user.refreshTokenCreated === (new Date(decoded.created))) {
				resolve(user);
			} else {
				reject();
			}

		});
	});
}

function verifyResetPasswordToken(resetPasswordToken) {
	return new Promise((resolve, reject) => {
		jwt.verify(resetPasswordToken, config.jwtSecret, (err, decoded) => {
			if (err) {
				// the 401 code is for unauthorized status
				reject(err);
			}

			const userId = decoded.sub;
			const userResetPasswordGuid = decoded.guid;
			const tokenCreated = new Date(decoded.created);

			// Check if the token has expired
			if (new Date().getTime() - tokenCreated.getTime() > Number(config.resetPasswordTokenExpiration)) {
				return reject();
			}

			// check if a user exists
			return User.findById(userId, (userErr, user) => {
				if (userErr || !user) {
					return reject();
				}

				// Check if user reset guid is equad to the decoded value
				if (user.resetPasswordGuid !== userResetPasswordGuid) {
					return reject();
				}
				resolve(user);
			});
		});
	});
}

module.exports = {
	verifyToken,
	verifyRefreshToken,
	verifyResetPasswordToken
};