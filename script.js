NETLIFY_API_HOST = 'https://unsplash-image-search-kstephens6054.netlify.app'
NETLIFY_PATH_PREFIX = '/.netlify/functions/unsplash'

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

  const options = {
    mode: 'cors'
  }

  try {
    const response = await fetch(url.href, options)
    const data = await response.json()
  } catch (error) {
    console.error(error)
  }
}

getRandomImages('woman with cigar', 10)
