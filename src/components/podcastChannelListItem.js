function podcastChannelListItem (podcastChannel) {
  let image = podcastChannel['im:image'][2].label
  let label = podcastChannel['im:name'].label
  let author = podcastChannel['im:artist'].label
  let id = podcastChannel['id'].attributes['im:id']

  return `
    <div class="podcast-channel" id=${id}>
      <div class="podcast-channel-photo">
        <img src=${image} alt="Photo of ${label}" class="podcast-channel-photo">
      </div>
      <div class="podcast-channel-info">
        <div class="podcast-channel-label">${label}</div>
        <div class="podcast-channel-author">Author: ${author}</div>
      </div>
    </div>
    `
}

export default podcastChannelListItem
