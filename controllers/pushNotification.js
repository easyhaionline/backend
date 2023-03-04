const express = require("express");
const Course = require('../models/Course')
const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.Notification_Access_Key_Id,
    secretAccessKey: process.env.Notification_Secret_Access_Key,
    region: "us-east-1",
  });

  const sns = new AWS.SNS({apiVersion: '2010-03-31'});

const pushNotification = async(request, response) => {
	const { title, message, topicArn } = request.body;
  const topicArno = await Course.findOne({topicArn})

  const params = {
    Message: "Hello", 
    TopicArn:  "arn:aws:sns:us-east-1:896408422234:Neet"
    // TopicArn : topicArno
  };
  // console.log("topicArno", topicArno)

  sns.publish(params, (err, data) => {
    if (err) {
      console.log("Error sending SNS message:", err);
      response.status(500).json({ error: "Error sending push notification" });
    } else {
      console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
    console.log("MessageID is " + data.MessageId);
      // console.log("SNS message sent successfully:",   );
      response.status(200).json({ message: `Message ${params.Message} sent to the topic ${params.TopicArn}` });
    }
  });
}


module.exports = {
    pushNotification
}