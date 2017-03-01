export default function ({ podcastId, episodeId }) {
  return new Promise((resolve, reject) => {
    const singlePodcastFromLS = JSON.parse(localStorage.getItem(podcastId))
    let item = singlePodcastFromLS.data.item[0]
    resolve(markup(item))
  })
}

function markup ({ title, description, enclosure }) {
  const audio = enclosure.url
  const audioType = enclosure.type
  // const description1 = item['itunes:subtitle']
  // const description2 = item['itunes:summary']
  // // let description = {}
  // // var isMyObjectEmpty = !Object.keys(description).length
  // // isMyObjectEmpty ? description = description2 : description = description1
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
