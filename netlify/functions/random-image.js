const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

const UNSPLASH_ACCESS_KEY='i1zKjeCtUmMWoUpz__Wgs7xufzVT8ajS7bFIUjjKvgo';

exports.handler = async function(event, context) {
  const url = 'https://api.unsplash.com/photos/random';
  const headers = {
    'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({data, url, headers})
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
}
