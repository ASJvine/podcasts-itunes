import episodeListItem from '../components/episodeListItem'

export default function ({podcastId}) {
  return new Promise((resolve, reject) => {
    const singlePodcastFromLS = localStorage.getItem(podcastId)
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
  return `
    <div class="podcast-channel-episodes page">
      <div class="episodes-header">
        <h2>Episodes: ${numberOfEpisodes}</h2>
      </div>
      <div class="episodes-list">
        <div class="table">
          <div class="table-row table-header" >
            <div class="table-row-item" id="title-header">Title</div>
            <div class="table-row-item">Date</div>
            <div class="table-row-item">Duration</div>
          </div>
          ${episodeListMarkup}
        </div>
      </div>
    </div>
  `
}
