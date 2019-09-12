const config = require('../../config');
const fs = require('fs');
const {sendEmail} = require('../../helpers/email');
const {verifyResetPasswordToken} = require('../../helpers/tokens');

function resetPassword(req, res) {
    return verifyResetPasswordToken(req.body.resetPasswordToken).then((user) => {
        req.user = user;
        req.user.resetPasswordToken = undefined;
        req.user.password = req.body.newPassword;

        return req.user.save().then(() => {
            var mailOptions = {
                to: req.user.email,
                from: config.mailProviderEmail,
                subject: 'Password has been Reseted',
                text: fs.readFileSync('../assets/emails/pass-restarted.html', 'utf8')
            };

            return sendEmail(mailOptions).then(err => {
                return res.json({
                    payload: {
                        user: {
                            email: req.user.email,
                            name: req.user.name
                        },
                        message: 'Password has been restarted'
                    }
                });
            });
        });
    });
}

module.exports = resetPassword;