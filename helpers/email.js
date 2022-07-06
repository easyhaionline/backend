const nodeMailer = require("nodemailer");
require('dotenv').config();
exports.sendEmailWithNodemailer = (req, res, emailData) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_TO, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      pass: process.env.EMAIL_PASS, // MAKE SURE THIS PASSWORD IS YOUR GMAIL APP PASSWORD WHICH YOU GENERATED EARLIER
    },
    tls: {
      ciphers: "SSLv3",
    },
  });
 
  return transporter
    .sendMail(emailData)
    .then((info) => {
      console.log(`Message sent: ${info.response}`);
      const Message = `<div className="alert alert-info">we get your request.</div>`
      return res.json({
        Message,
        success: true
        
      });
    })
    .catch((err) => console.log(`Problem sending email: ${err}`));
};
 