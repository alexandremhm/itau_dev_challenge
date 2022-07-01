"use strict";
const nodemailer = require("nodemailer");
const {generateHtml} = require("./html.js")

const notification = async (email) => {

  const html = generateHtml(email);

  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
      user: testAccount.user, 
      pass: testAccount.pass,
    },
  });


  let info = await transporter.sendMail({
    from: '"Itau-dev-challenge" <itau@dev-challenge.com>',
    to: email,
    subject: "Sua conta foi bloqueada", 
    html: html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = {
  notification,
}
