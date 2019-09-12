const config = require('../../config');
const fs = require('fs');
const {sendEmail} = require('../../helpers/email');

function forgotPassword(req, res) {
    User.findOne({email: req.body.email.trim()}, (err, user) => {
        if(err || !user) {
            return;
        }

        var mailOptions = {
            to: user.email,
            from: config.mailProviderSettings.email,
            subject: 'Forget Password',
            text: fs.readFileSync('../assets/emails/forgot-pass.html', 'utf8')
        };

        mailOptions.text = mailOptions.text
            .replace('[resetPasswordUrl]', config.resetPasswordUrl)
            .replace('[resetPasswordToken]', user.generateResetPasswordToken());
    
        sendEmail(mailOptions).then(err => {
            // Log that the email has been sent
        });
    });

    // In any case we return 200 OK for security reasons
    return res.sendStatus(200);
}

module.exports = forgotPassword;