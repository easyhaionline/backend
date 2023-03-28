const axios = require("axios");
const querystring = require("querystring");

const generateToken = async () => {
  const requestBody = querystring.stringify({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "client_credentials",
    scope: "https://graph.microsoft.com/.default",
  });

  const response = await axios.post(
    `https://login.microsoftonline.com/${process.env.TENENT_ID}/oauth2/v2.0/token`,
    requestBody
  );

  return response.data.access_token;
};

const createMeeting = async (req, res) => {
  const bearerToken = `Bearer ${await generateToken()}`;
  const payload = {
    subject: req.body.name,
    start: {
      dateTime: req.body.startDateTime,
      timeZone: "UTC+05:30",
    },
    end: {
      dateTime: req.body.endDateTime,
      timeZone: "UTC+05:30",
    },
    isOnlineMeeting: true,
    onlineMeetingProvider: "teamsForBusiness",
  };

  const data = await axios.post(
    `https://graph.microsoft.com/v1.0/users/${process.env.TEAMS_USER_ID}/events`,
    payload,
    {
      headers: {
        Authorization: bearerToken,
        "Content-Type": "application/json",
      },
    }
  );
  res.status(200).json({ url: data.data.onlineMeeting.joinUrl });
};

const getMeetings = async (req, res) => {
  const bearerToken = `Bearer ${await generateToken()}`;

  const payload = {
    subject: req.body.name,
    start: {
      dateTime: "2023-02-12T10:22:25.208Z",
      timeZone: "UTC",
    },
    end: {
      dateTime: "2023-02-19T10:22:25.208Z",
      timeZone: "UTC",
    },
    isOnlineMeeting: true,
    onlineMeetingProvider: "teamsForBusiness",
  };

  const data = await axios.get(
    `https://graph.microsoft.com/v1.0/users/${process.env.TEAMS_USER_ID}/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location`,
    {
      headers: {
        Authorization: bearerToken,
        "Content-Type": "application/json",
      },
    }
  );

  res.status(200).json({ data: data.data.value });
};

module.exports = { createMeeting, getMeetings };
