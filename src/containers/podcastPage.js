import itunesMethods from '../helpers/itunes'

export default function ({ podcastId }) {
  loadPodcast(podcastId)

  return Promise.resolve(`Podcast page: ${podcastId}`)
}

function loadPodcast (podcastId) {
  return itunesMethods.getPodcast(podcastId)
    .then(console.log)
    .then(itunesData => {
      console.log('[itunes data from podcastPAGE]', itunesData)
    })
}
