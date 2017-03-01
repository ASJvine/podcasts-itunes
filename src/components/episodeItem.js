export default function episodeItem (item) {
  const title = item.title
  const audio = item.enclosure.url
  const audioType = item.enclosure.type
  const description1 = item['itunes:subtitle']
  const description2 = item['itunes:summary']
  let description = {}
  var isMyObjectEmpty = !Object.keys(description).length
  isMyObjectEmpty ? description = description2 : description = description1
  return `
    <div class="single-podcast-header">
      <h2>${title}</h2>
    </div>
    <div class="single-podcast-description">
      <p>${description}</p>
    </div>
    <div class="single-podcast-audio">
      <audio controls="controls">
        <source src="${audio}" type="${audioType}" />
      Your browser does not support the audio element.
      </audio>
    </div>
  `
}
