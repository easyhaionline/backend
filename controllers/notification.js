const AWS = require("aws-sdk");

const verify = async (req, res) => {
  AWS.config.update({
    accessKeyId: process.env.Notification_Access_Key_Id,
    secretAccessKey: process.env.Notification_Secret_Access_Key,
    region: "us-east-1",
  });

  const ses = new AWS.SES();

  const { recipientEmail } = req.body;

  const emailAddress = recipientEmail;

  let params = {
    EmailAddress: emailAddress,
  };

  ses.verifyEmailAddress(params, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).send(`Verification email sent to ${emailAddress}`);
    }
  });
};

const checkEmailStatus = (req, res) => {
  AWS.config.update({
    accessKeyId: process.env.Notification_Access_Key_Id,
    secretAccessKey: process.env.Notification_Secret_Access_Key,
    region: "us-east-1",
  });

  const ses = new AWS.SES();
  const emailAddress = req.params.email;

  ses.listVerifiedEmailAddresses({}, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      if (data.VerifiedEmailAddresses.includes(emailAddress)) {
        res.status(200).json({ status: true });
      } else {
        res.status(200).json({ status: false });
      }
    }
  });
};

const sendEmail = async (req, res) => {

  AWS.config.update({
    accessKeyId: process.env.Notification_Access_Key_Id,
    secretAccessKey: process.env.Notification_Secret_Access_Key,
    region: "us-east-1",
  });

  const ses = new AWS.SES();

<<<<<<< HEAD
//   const htmlTemplate = `
//   <html>
//     <head>
//       <title>${req.body.title}</title>
//     </head>
//     <body>
//       <p>Dear ${req.body.user},</p>
//       ${req.body.message1}
//       ${req.body.message2}
//       <button style={{background-color:"blue"}} >
//       <a href=${req.body.link}>
//         Join
//       </a>
//     </button>
//     </body>
//   </html>
// `;

  // const htmlTemplate = notification()
  const htmlTemplate = req.body.template


=======
  const htmlTemplate = req.body.template
>>>>>>> 732fc915a6d9b2a1ea5ec1aa6f8628958ffddd09
  
  const fromAddress = "noreply@easyhaionline.com";

  req.body.recipientEmail.map((item) => {
    ses.listVerifiedEmailAddresses({}, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        if (data.VerifiedEmailAddresses.includes(item)) {
          const params = {
            Destination: {
              ToAddresses: [item],
            },
            Message: {
              Body: {
                Html: {
                  Charset: "UTF-8",
                  Data: htmlTemplate,
                },
              },
              Subject: {
                Charset: "UTF-8",
                Data: req.body.emailSubject,
              },
            },
            Source: fromAddress,
            
          };

          ses.sendEmail(params, (err, data) => {
            if (err) {
              console.error(err);
            } else {
              console.log("Email sent to " + item);
            }
          });

        } else {
          console.log("not verified");
        }
      }
    });
  });

  res.send("Email sent to succesfully");


};

module.exports = { verify, sendEmail, checkEmailStatus };