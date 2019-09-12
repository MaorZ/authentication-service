function sendForgotPasswordEmail(email) {
	User.findOne({ email: email.trim() }, (err, user) => {
        if (err || !user) {
            return;
        }
    
        user.generateResetPasswordToken();
    
        user.save().then(() => {
            var mailOptions = {
                to: user.email,
                from: config.mailProviderEmail,
                subject: 'Password Reset',
                html: fs.readFileSync('../assets/emails/forgat-pass.html', 'utf8')
            };
    
            sendEmail(mailOptions).then(err => {
                if (err) {
                    // Maybe write to log that we failed to send the mail
                } else {
                    // Maybe write to log that the mail has been sent
                }
            })
        });
    });
}

module.exports = {
	sendForgotPasswordEmail
};