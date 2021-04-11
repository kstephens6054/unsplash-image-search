const fetch = require('node-fetch');
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

exports.handler = async function(event, context) {
  const url = 'https://api.unsplash.com/photos/random';
  const headers = {
    'Authorization': `Client-ID ${ACCESS_KEY}`,
    'Accept-Version': 'v1'
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
}
