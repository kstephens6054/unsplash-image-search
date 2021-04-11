const fetch = require('node-fetch');

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const PATH_PREFIX = process.env.NETLIFY_PATH_PREFIX;
const API_URL = process.env.UNSPLASH_API_URL;

exports.handler = async (event, context) => {
  if (!event.path.startsWith(PATH_PREFIX)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Bad request'})
    };
  }

  const url = new URL(event.path.replace(PATH_PREFIX, API_URL));

  if (event.rawQuery) {}
    url.search = new URLSearchParams(event.rawQuery);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      url: url.toString(),
      event
    })
  };
  
  const options = {
    method: event.httpMethod,
    headers: {
    'Authorization': `Client-ID ${ACCESS_KEY}`,
    'Accept-Version': 'v1'
    }
  };

  if (/^(?:POST|PUT|PATCH)$/i.test(event.httpMethod)) {
    options.body = event.body
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify({
        url.toString(),
        options,
        data
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }};
