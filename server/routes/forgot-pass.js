const config = require('../../config');
const nodemailer = require("nodemailer");

function forgetPassword(req, res) {
    return User.findOne({ email: req.body.email.trim() }, (err, user) => {
        if (err || !user) {
            return res.json({
                errors: {
                    email: 'EMAIL_NOT_EXIST'
                }
            });
        }

        req.user = user;

        req.user.resetPasswordToken = req.user.getResetPasswordToken();

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
                subject: 'Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + config.adminPanelDomain + '/reset/' + req.user.resetPasswordToken + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };

            return smtpTransport.sendMail(mailOptions).then(err => {
                if (err) {
                    return res.json({
                        errors: {
                            resetPassword: 'FAILD_SEND_RESET_EMAIL'
                        }
                    });
                }

                return res.json({
                    payload: {
                        user: {
                            email: req.user.email,
                            name: req.user.name
                        },
                        message: 'Reset password mail has been sent'
                    }
                })
            })
        });
    });
}

module.exports = forgetPassword;