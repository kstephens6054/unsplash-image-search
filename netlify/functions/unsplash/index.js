const { Path } = require('path-parser');

const { handler: photosHandler } = require('./photos');
const { handler: searchHandler } = require('./search');

const PATH_PREFIX = '/.netlify/functions/unsplash';

const error404 = () => {
  return {
    statusCode: 404,
    body: JSON.stringify({
      error: 'Not Found'
    })
  }
};

exports.handler = async (event, context) => {
  if (!event.path.startsWith(PATH_PREFIX)) {
    return error404();
  }

  const localEvent = {
    rawEvent: event
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
    ...event,
    path: event.path.replace(PATH_PREFIX, ''),
  };

  if (localEvent.path.startsWith('/photos')) {
    return photosHandler(localEvent, context);
  }

  if (localEvent.path.startsWith('/search')) {
    return searchHandler(localEvent, context);
  }

  return error404();
};
