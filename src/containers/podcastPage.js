import * as http from '../utils/http'

export default function ({podcastId}) {
  return new Promise((resolve, reject) => {
    const podcastScript = document.createElement('script')
    podcastScript.src = `https://itunes.apple.com/lookup?id=${podcastId}&callback=podcastCallback`
    window.podcastCallback = function ({results}) {
      const feedUrl = results[0].feedUrl
      console.log(feedUrl)
      http.GET('http://localhost:3030/?url=' + encodeURIComponent(feedUrl))
        .then(JSON.parse)
        .then(function (data) {
          console.log('Response from proxy server: ', data)
        })
    }
    document.head.appendChild(podcastScript)
    resolve('Promise RESOLVEDDDD!!!')
  })
}
