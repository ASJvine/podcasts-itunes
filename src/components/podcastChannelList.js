function podcastChannelList (podcastChannel) {
  let image = podcastChannel['im:image'][0].label
  let label = podcastChannel['im:name'].label
  let author = podcastChannel['im:artist'].label
  let id = podcastChannel['id'].attributes['im:id']

  return `<li class="podcast-channel" id=${id}>
    <img src="${image}" alt="Photo of ${label}" class="podcast-channel-photo">
    <div class="podcast-channel-label">${label}</div>
    <div class="podcast-channel-author">Author: ${author}</div>
  </li>`
}

export default podcastChannelList
