const { sendEmailWithNodemailer } = require("../helpers/email");

exports.contactForm = (req, res) => {

    const { name, email, message,number,subject } = req.body;
   
    const emailData = {
      from: email, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      to: process.env.EMAIL_TO, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE YOUR GMAIL
      subject: `Contact form-${process.env.APP_NAME}-${subject}`,
      text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message} \n Sender number: ${number}`,
      html: `
          <h4>Email received from contact form:</h4>
          <p>Sender name: ${name}</p>
          <p>Sender email: ${email}</p>
          <p>Sender message: ${message}</p>
          <p>Sender Phone: ${number}</p>
          <hr />
          <p>This email may contain sensitive information</p>
          <p>https://AkDiagnostic.com</p>
      `,
    };
   
    sendEmailWithNodemailer(req, res, emailData);
  };
  
