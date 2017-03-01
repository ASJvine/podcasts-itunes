import * as http from '../utils/http'
import * as utils from '../utils'
import podcastLateralBar from '../components/podcastLateralBar'
import episodeListItem from '../components/episodeListItem'

export default function ({podcastId}) {
  return new Promise((resolve, reject) => {
    const singlePodcastFromLS = localStorage.getItem(podcastId)
    if (!singlePodcastFromLS || utils.isLsPodcastDataStale(JSON.parse(singlePodcastFromLS).date)) {
      console.log('fetching podcast')
      const podcastScript = document.createElement('script')
      podcastScript.src = `https://itunes.apple.com/lookup?id=${podcastId}&callback=podcastCallback`
      window.podcastCallback = function ({results}) {
        const feedUrl = results[0].feedUrl
        http.GET('http://localhost:3030/?url=' + encodeURIComponent(feedUrl))
          .then(JSON.parse)
          .then(function (data) {
            return saveSinglePodcastToLs(data.rss.channel, podcastId)
          })
          .then(function (channel) { return markup(channel, podcastId) })
          .then(resolve)
      }
      document.head.appendChild(podcastScript)
      return
    }
    resolve(
      markup(JSON.parse(singlePodcastFromLS).data, podcastId)
    )
  })
}

function markup (channel, podcastId) {
  const episodeListMarkup = channel.item
    .map(function (item, index) { return episodeListItem(item, podcastId, index) })
    .join(' ')
  const numberOfEpisodes = channel.item.length
  const podcastLateralBarMarkup = podcastLateralBar(channel, podcastId)
  return `
    <div class="main-container-podcast">
      ${podcastLateralBarMarkup}
        <div class="podcast-channel-episodes page" id="section">
          <div class="episodes-header">
            <h2>Episodes: ${numberOfEpisodes}</h2>
          </div>
          <div class="episodes-list">
            <div class="table">
              <div class="table-row table-header">
                <div class="table-row-item">Title</div>
                <div class="table-row-item">Date</div>
                <div class="table-row-item">Duration</div>
              </div>
              ${episodeListMarkup}
            </div>
          </div>
        </div>
    </div>
  `
}

function saveSinglePodcastToLs(channel, podcastId) {
  localStorage.setItem(podcastId, JSON.stringify({
    data: channel,
    date: Date.now() / 1000
  }))
  return channel
}
