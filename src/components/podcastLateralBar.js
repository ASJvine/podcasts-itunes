export default function podcastLateralBar (channel) {
  const image = channel['itunes:image'].href
  const label = channel.title
  const author = channel['itunes:author']
  const description = channel.description
  // const id = channel['id'].attributes['im:id']

  return `
    <div class="podcast-list-item-detailed">
      <div class="podcast-list-item-detailed-photo-wrapper">
        <img src=${image} alt="Photo of ${label}">
      </div>
      <div class="podcast-list-item-detailed-info-wrapper">
        <div class="podcast-list-item-detailed-info">
          <div class="podcast-list-item-detailed-info-label">${label}</div>
          <div class="podcast-list-item-detailed-info-author">by ${author}</div>
        </div>
        <div class="podcast-list-item-detailed-description">
          <h4>Description:</h4>
          <p>${description}<p>
        </div>
      </div>
    </div>
  `
}
