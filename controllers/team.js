const { Client } = require("@microsoft/microsoft-graph-client");
const {
  TokenCredentialAuthenticationProvider,
} = require("@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials");
const { AuthorizationCodeCredential } = require("@azure/identity");
const axios = require('axios')
const querystring = require('querystring')

const createMeeting = async (req, res) => {
  
  const requestBody = querystring.stringify({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: 'client_credentials',
    scope: 'https://graph.microsoft.com/.default'
  });

  const response = await axios.post(`https://login.microsoftonline.com/${process.env.TENENT_ID}/oauth2/v2.0/token`, requestBody);

  // console.log(response)
  
  
  const data = await axios.post(
    'https://graph.microsoft.com/v1.0/me/events',
    // 'https://graph.microsoft.com/v1.0/users/be850ae4-c08d-4d4b-bafd-c2d512e50b27/events',
    req.body,
    {
      headers: {
        Authorization: `Bearer ${response.data.access_token}`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  
  console.log(data)


  res.status(200).json(data);

};

module.exports = { createMeeting };
