const express = require("express");
const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.Notification_Access_Key_Id,
    secretAccessKey: process.env.Notification_Secret_Access_Key,
    region: "us-east-1",
  });

const pushNotification = async(request, response) => {
	const { title, message, topicArn } = req.body;

  var params = {
    Message: JSON.stringify({title: req.body.title}), 
    TopicArn:  "arn:aws:sns:us-east-1:896408422234:Demo_neet"
  };

  sns.publish(messageParams, (err, data) => {
    if (err) {
      console.error(`Error sending message: ${err.message}`);
    } else {
      console.log(`Message sent: ${data.MessageId}`);
    }
  });
	
}


module.exports = {
    pushNotification
}