const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.configure();

exports.handler = async function(event, context) {
  const url = 'https://api.unsplash.com/photos/random';
  const headers = {
    'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
}
