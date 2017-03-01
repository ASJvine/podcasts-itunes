import * as utils from '../utils'
import * as itunes from '../utils/itunes'
import podcastSidebar from '../components/podcastSidebar'

export default function ({podcastId}) {
  return new Promise((resolve, reject) => {
    const singlePodcastFromLS = localStorage.getItem(podcastId)
    if (singlePodcastFromLS && !utils.isLsPodcastDataStale(JSON.parse(singlePodcastFromLS).date)) {
      resolve(
        markup(JSON.parse(singlePodcastFromLS).data, podcastId)
      )
      return
    }
    itunes.getPodcast(podcastId)
      .then(channel => saveSinglePodcastToLs(channel, podcastId))
      .then(channel => markup(channel, podcastId))
      .then(resolve)
      .catch(reject)
  })
}

function markup (channel, podcastId) {
  return `
    <div class="main-container-podcast">
      ${podcastSidebar(channel, podcastId)}
      <div id="podcast-children-container"></div>
    </div>
  `
}

function saveSinglePodcastToLs (channel, podcastId) {
  localStorage.setItem(podcastId, JSON.stringify({
    data: channel,
    date: Date.now() / 1000
  }))
  return channel
}
