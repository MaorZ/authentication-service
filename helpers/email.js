const nodemailer = require('nodemailer');
const config = require('../config');

function sendEmail(emailOptions) {
	var smtpTransport = nodemailer.createTransport({
        service: config.mailProviderSettings.service,
        auth: {
            user: config.mailProviderSettings.email,
            pass: config.mailProviderSettings.password
        }
    });

    return smtpTransport.sendMail(emailOptions);
}

module.exports = {
	sendEmail
};