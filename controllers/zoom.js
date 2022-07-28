//include required modules
const express = require("express");
const cors = require("cors"); //Cross-Origin Resource Sharing

const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("./config");
const rp = require("request-promise");
const crypto = require('crypto')
const KJUR = require('jsrsasign')


var email, userid, resp;

const payload = {
  iss: config.APIKey,
  exp: new Date().getTime() + 5000,
};

const token = jwt.sign(payload, config.APISecret);
const zoomMeeting = (req, res) => {
  email = req.body.email;
  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    body: {
      topic: "Meeting",
      type: 1,
      settings: {
        host_video: "true",
        participant_video: "true",
      },
    },
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true,
  };

  rp(options)
    .then(function (response) {
      let dataRes = {
        join_url: response,
        zoom_response: response
      };
      res.status(200).json(dataRes);

    })
    .catch(function (err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });
}



const zoomSignature = (req, res) => {

  const iat = Math.round((new Date().getTime() - 30000) / 1000)
  const exp = iat + 60 * 60 * 2

  const oHeader = { alg: 'HS256', typ: 'JWT' }

  const oPayload = {
    sdkKey: '1X5bKPWVYyWTvL6FkMbJgBnbxhwQhTLwKPqY',
    mn: req.body.meetingNumber,
    role: req.body.role,
    iat: iat,
    exp: exp,
    appKey: '7MxLyeGclg0qy2B6Ho78GeFgWpcglIr0O12e',
    tokenExp: iat + 60 * 60 * 2
  }

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, '7MxLyeGclg0qy2B6Ho78GeFgWpcglIr0O12e')

  res.json({
    signature: signature
  })
}



module.exports = {
    zoomMeeting,
    zoomSignature
};