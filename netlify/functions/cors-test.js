exports.handler = async (event, context) => {
  console.log(JSON.stringify(event, null, 2));

  if (event.httpMethod === 'OPTIONS') {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Max-Age': 86400
    };
    
    return {
      statusCode: 200, // <-- Must be 200 otherwise pre-flight call fails
      headers,
      body: 'This was a preflight call!'
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': 86400
    },
    body: JSON.stringify(event)
  };
};
