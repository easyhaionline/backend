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
      res
        .status(200)
        .send({
          msg: `Verification email sent to ${emailAddress}`,
          data: data,
        });
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

  const htmlTemplate = req.body.template;

  const fromAddress = "noreply@easyhaionline.com";

  req.body.recipientEmail.map((item) => {
    ses.listVerifiedEmailAddresses({}, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        if (data.VerifiedEmailAddresses.includes(item)) {
          const params = {
            // Destination: {
            //   ToAddresses: [item],
            // },
            // Message: {
            //   Body: {
            //     Html: {
            //       Charset: "UTF-8",
            //       Data: htmlTemplate,
            //     },
            //   },
            //   Subject: {
            //     Charset: "UTF-8",
            //     Data: req.body.emailSubject,
            //   },
            // },
            EmailAddress: item, // The email address to send the verification email to
            TemplateName: "VerifyEmail", // The name of your email template
            // TemplateData: '{ "name":"John Doe" }',
          };

          // ses.sendCustomVerificationEmail

          ses.sendCustomVerificationEmail(params, (err, data) => {
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

  res.send("Email sent succesfully");
};

module.exports = { verify, sendEmail, checkEmailStatus };
