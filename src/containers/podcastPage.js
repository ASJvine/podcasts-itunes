// import * as itunes from '../utils/itunes'

export default function ({ podcastId }) {
  return new Promise((resolve, reject) => {
    const podcastScript = document.createElement('script')
    podcastScript.src = `https://itunes.apple.com/lookup?id=${podcastId}&callback=podcastCallback`
    window.podcastCallback = function ({ results }) {
      const feedUrl = results[0].feedUrl
      console.log(feedUrl)
      const episodeScript = document.createElement('script')
      console.log('feedUrl', feedUrl)
      episodeScript.src = `${feedUrl}?callback=episodeCallback`
      episodeScript.type = 'text/javascript'
      document.head.appendChild(episodeScript)
    }
    document.head.appendChild(podcastScript)

    window.episodeCallback = function () {
      console.log('[episodeCallback]', arguments)
    }
  })
}
