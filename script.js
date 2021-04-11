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
    mode: 'cors',
    headers: {
      'Origin': 'https://unsplash-image-search.kstephens6054.repl.co'
    }
  }

  try {
    const response = await fetch(url.href, options)
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const runCORSTest = async () => {
  const url = new URL(NETLIFY_API_HOST)
  url.pathname = '/.netlify/functions/cors-test'

  const options = {
    mode: 'cors',
    headers: {
      'Origin': 'https://unsplash-image-search.kstephens6054.repl.co'
    }
  }

  try {
    const response = await fetch(url.href, options)
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

runCORSTest().then(console.log)

window.addEventListener('DOMContentLoaded', (event) => {
  
  const searchForm = document.querySelector('#search-form');
  const searchTerms = document.querySelector('#search-terms');
  const imageCount = document.querySelector('#image-count');
  const currentImage = document.querySelector('#current-image');

  const state = {
    searchTerms: '',
    imageCount: 1,
    images: []
  };

  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (searchTerms.value !== '') {
      state.searchTerms = searchTerms.value;
    }

    if (imageCount.value !== '') {
      let count = parseInt(imageCount.value);
      state.imageCount = isNaN(count) ? 1 : count;
    }

    const result = await getRandomImages(state.searchTerms, state.imageCount);

    if (result.errors) {
      console.log('ERROR: ', result.errors);
    }

    state.images = result;
    currentImage.src = state.images[0].urls.regular;
  })

});
