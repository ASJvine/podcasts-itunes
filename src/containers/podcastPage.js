import * as http from '../utils/http'
import * as utils from '../utils'
import podcastLateralBar from '../components/podcastLateralBar'

export default function ({podcastId}) {
  return new Promise((resolve, reject) => {
    const singlePodcastFromLS = localStorage.getItem(podcastId)
    if (!singlePodcastFromLS || utils.isLsPodcastDataStale(JSON.parse(singlePodcastFromLS).date)) {
      console.log('fetching podcast')
      const podcastScript = document.createElement('script')
      podcastScript.src = `https://itunes.apple.com/lookup?id=${podcastId}&callback=podcastCallback`
      window.podcastCallback = function ({results}) {
        const feedUrl = results[0].feedUrl
        console.log(feedUrl)
        http.GET('http://localhost:3030/?url=' + encodeURIComponent(feedUrl))
          .then(JSON.parse)
          .then(function (data) {
            return saveSinglePodcastToLs(data.rss.channel, podcastId)
          })
          .then(podcastLateralBar)
          .then(resolve)
      }
      document.head.appendChild(podcastScript)
      // resolve('Promise RESOLVEDDDD!!!')
      return
    }
    resolve(
      podcastLateralBar(JSON.parse(singlePodcastFromLS).data)
    )
  })
}

function saveSinglePodcastToLs(obj, podcastId) {
  localStorage.setItem(podcastId, JSON.stringify({
    data: obj,
    date: Date.now() / 1000
  }))
  return obj
}
