// /helpers/email.js
const nodeMailer = require("nodemailer");
 
exports.sendEmailWithNodemailer = (req, res, emailData) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_TO, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      pass: process.env.SOME_KEY, // MAKE SURE THIS PASSWORD IS YOUR GMAIL APP PASSWORD WHICH YOU GENERATED EARLIER
    },
    tls: {
      ciphers: "SSLv3",
    },
  });
 
  return transporter
    .sendMail(emailData)
    .then((info) => {
 
   
      console.log(`Message sent: ${info.response}`);
      return res.status(200).json({
        success: true,
      });
   
    }
    )
    .catch((err) => {return `Problem sending email: ${err} :${emailData}`});
};


