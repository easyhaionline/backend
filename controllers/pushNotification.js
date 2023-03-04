const express = require("express");
const Course = require("../models/Course");
const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.Notification_Access_Key_Id,
  secretAccessKey: process.env.Notification_Secret_Access_Key,
  region: "us-east-1",
});

const sns = new AWS.SNS({ apiVersion: "2010-03-31" });

const pushNotification = async (request, response) => {
  const { title, body, topicArn } = request.body;

  const message = {
    default:"www.easyhaionline.com",
    GCM: JSON.stringify({
      notification: {
        title: title,
        body: body
      }
    })
  }

  const params = {
    Message:JSON.stringify(message),
    MessageStructure:'json',
    TopicArn: topicArn, 
  };

  sns.publish(params, (err, data) => {
    if (err) {
      response.status(500).json({ err: "Error sending push notification", err });
    } else {
      response
        .status(200)
        .json({
          message: `Message ${params.Message} sent to the topic ${params.TopicArn}`,
        });
    }
  });
};

module.exports = {
  pushNotification,
};
