const config = require('../../config');
const {verifyResetPasswordToken} = require('../../helpers/tokens');

function forgotPasswordInfo(req, res) {
    return verifyResetPasswordToken(req.params.resetToken).then((user) => {
		req.user = user;

        return res.json({
            payload: {
                user: {
                    email: req.user.email,
                    name: req.user.name
                },
                resetPasswordGuid: req.user.resetPasswordGuid
            }
        });
	}, () => {
        return res.status(400).end();
    });
}

module.exports = forgotPasswordInfo;