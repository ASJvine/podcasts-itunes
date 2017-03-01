import * as http from './http'

export const getPodcasts = () => {
  return http.GET('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
    .then(JSON.parse)
    .then(({ feed }) => feed.entry)
}

export const getPodcast = (id) => {
  return new Promise((resolve, reject) => {
    const podcastScript = document.createElement('script')
    podcastScript.src = `https://itunes.apple.com/lookup?id=${id}&callback=podcastCallback`
    window.podcastCallback = function ({results}) {
      const feedUrl = results[0].feedUrl
      http.GET('http://localhost:3030/?url=' + encodeURIComponent(feedUrl))
        .then(JSON.parse)
        .then(data => resolve(data.rss.channel))
        .catch(reject)
    }
    document.head.appendChild(podcastScript)
  })
}
