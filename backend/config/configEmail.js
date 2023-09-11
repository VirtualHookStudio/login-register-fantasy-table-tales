const fs = require('fs');
const path = require('path');

const handlebars = require('handlebars');
const nodemailer = require('nodemailer')

const {authEmail} =  require('../.env')

const transporter = nodemailer.createTransport(authEmail)
const sourcePath = path.join(__dirname, '../assets/emailTemplate.handlebars');

const source = fs.readFileSync(sourcePath, 'utf8');
const template = handlebars.compile(source);

module.exports = {transporter, template}
