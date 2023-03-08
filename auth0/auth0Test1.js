var request = require("request");

var options = { method: 'POST',
  url: 'https://dev-0qdak8w3j46gzknx.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form:
   { client_id: '3tNabD1I81eQ0RYe5QjRo2cKPFxaFfAM',
     client_secret: 'plVRrkmlaWX9McjLI1I6QzMPb4IiWsf1G5OeB1WneIvNeOHRh26LHzdEzTS40IAo',
     audience: 'https://dev-0qdak8w3j46gzknx.us.auth0.com/api/v2/',
     grant_type: 'client_credentials' }
   };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});