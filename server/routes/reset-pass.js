const config = require('../../config');
const nodemailer = require("nodemailer");
const { verifyResetPasswordToken } = require('../../helpers/tokens');

function resetPassword(req, res) {
    return verifyRefreshToken(req.body.resetPasswordToken).then((user) => {
        req.user = user;
        req.user.resetPasswordToken = undefined;
        req.user.password = req.body.newPassword;

        return req.user.save().then(() => {

            var smtpTransport = nodemailer.createTransport({
                service: config.mailProviderService,
                auth: {
                    user: config.mailProviderEmail,
                    pass: config.mailProviderPassword
                }
            });

            var mailOptions = {
                to: req.user.email,
                from: config.mailProviderEmail,
                subject: 'Password has been Reseted',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + req.user.email + ' has just been changed.\n'
            };

            return smtpTransport.sendMail(mailOptions).then(err => {
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