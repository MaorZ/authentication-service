const config = require('../../config');
const fs = require('fs');
const {sendEmail} = require('../../helpers/email');
const {verifyResetPasswordToken} = require('../../helpers/tokens');

function resetPassword(req, res) {
    User.findOne({resetPasswordGuid: req.body.resetPasswordGuid}, (err, user) => {
        if(err || !user) {
            return res.status(400).end();
        }

        req.user = user;
        req.user.resetPasswordGuid = undefined;
        req.user.password = req.body.newPassword;

        var mailOptions = {
            to: req.user.email,
            from: config.mailProviderEmail,
            subject: 'Password has been Restarted',
            text: fs.readFileSync('../assets/emails/pass-restarted.html', 'utf8')
        };

        sendEmail(mailOptions).then(err => {
            // Log that the email has been sent
        });

        return req.user.save().then(() => {
            return res.sendStatus(200);
        }, () => {
            return res.status(400).end();
        });
    });
}

module.exports = resetPassword;