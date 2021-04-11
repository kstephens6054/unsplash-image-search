NETLIFY_API_HOST = 'https://unsplash-image-search-kstephens6054.netlify.app'
NETLIFY_PATH_PREFIX = '/.netlify/functions/unsplash'

async function preflight() {
  const url = new URL(NETLIFY_API_HOST)
  url.pathname = NETLIFY_PATH_PREFIX

  options = {
    method: 'OPTIONS',
    mode: 'cors',
    headers: {
      'Origin': 'https://unsplash-image-search.kstephens6054.repl.co',
      'Access-Control-Request-Method': 'GET',
      'Access-Control-Request-Headers': 'Content-type'
    }
  }

  try {
    const response = await fetch(url.href, options)
    console.log(response)
    const text = await response.text()
    console.log(text)
  } catch (error) {
    console.error(error)
  }
}

async function getRandomImages(query, count) {
  const url = new URL(NETLIFY_API_HOST)
  url.pathname = NETLIFY_PATH_PREFIX + '/photos/random'

  const params = new URLSearchParams()

  if (query) {
    params.append('query', query)
  }

  if (count) {
    params.append('count', count)
  }

  url.search = params
  console.log(url.href)

  const options = {}

  try {
    const response = await fetch(url.href, options)
    console.log('response:', response)
    const data = await response.json()
    console.log(data);
  } catch (error) {
    console.error(error)
  }
}

//preflight()
getRandomImages('woman with cigar', 10)
