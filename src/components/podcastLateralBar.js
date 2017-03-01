export default function podcastLateralBar (channel, id) {
  const image = channel['itunes:image'].href
  const label = channel.title
  const author = channel['itunes:author']
  const description = channel.description
  // const id = channel['id'].attributes['im:id']

  return `
    <div class="podcast-list-item-detailed">
      <a class="podcast-list-item-detailed-photo-wrapper id="${id}" href="/podcast/${id}">
        <img src=${image} alt="Photo of ${label}">
      </a>
      <div class="podcast-list-item-detailed-info-wrapper">
        <a class="podcast-list-item-detailed-info" id="${id}" href="/podcast/${id}">
          <div class="podcast-list-item-detailed-info-label">${label}</div>
          <div class="podcast-list-item-detailed-info-author">by ${author}</div>
        </a>
        <div class="podcast-list-item-detailed-description">
          <h4>Description:</h4>
          <p>${description}<p>
        </div>
      </div>
    </div>
  `
}
