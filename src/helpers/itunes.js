import getData from './getData'
import getCorsData from './getCorsData'

const URL_PODCAST_LIST = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
const URL_SINGLE_PODCAST = 'https://itunes.apple.com/lookup?id='
// const URL_SINGLE_PODCAST = 'https://crossorigin.me/https://itunes.apple.com/lookup?id='

let itunesMethods = {
  getPodcastList: function () {
    return getData(URL_PODCAST_LIST)
  },
  getPodcast: function (podcastId) {
    // let url = `https://itunes.apple.com/search?term=jack+johnson&country=US&callback=wsSearchCB`
    let url = `${URL_SINGLE_PODCAST}podcastId`
    console.log('[cors Url]', url)
    return getCorsData(url)
  }
}

export default itunesMethods
