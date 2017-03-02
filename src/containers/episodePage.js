import * as utils from '../utils'

export default function ({ podcastId, episodeId }) {
  return new Promise((resolve, reject) => {
    const singlePodcastFromLS = JSON.parse(localStorage.getItem(podcastId))
    let item = singlePodcastFromLS.data.item[episodeId]
    let treatedItem = getEpisodeData(item)
    resolve(markup(treatedItem))
  })
}

function getEpisodeData (item) {
  const { title, enclosure } = item
  const audio = enclosure.url
  const audioType = enclosure.type
  let description = item.description
  const description2 = item['itunes:summary']
  description = utils.isMyObjectUndefined(description) ? description2 : description
  return {
    title,
    description,
    audio,
    audioType
  }
}

function markup ({title, description, audio, audioType}) {
  return `
    <div class="podcast-channel-episode">
      <div class="podcast-channel-episode-header">
        <h2>${title}</h2>
      </div>
      <div class="podcast-channel-episode-description">
        <p>${description}</p>
      </div>
      <div class="podcast-channel-episode-audio">
        <audio controls="controls">
          <source src="${audio}" type="${audioType}" />
        Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  `
}
