const nodemailer = require('nodemailer');

function sendEmail(emailOptions) {
	var smtpTransport = nodemailer.createTransport({
        service: config.mailProviderService,
        auth: {
            user: config.mailProviderEmail,
            pass: config.mailProviderPassword
        }
    });

    return smtpTransport.sendMail(emailOptions);
}

module.exports = {
	sendEmail
};