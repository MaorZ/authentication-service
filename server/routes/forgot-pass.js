const config = require('../../config');
const fs = require('fs');
const {sendEmail} = require('../../helpers/email');

function forgetPassword(req, res) {
    return res.sendStatus(200);
}

module.exports = forgetPassword;