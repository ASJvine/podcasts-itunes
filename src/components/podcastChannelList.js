function podcastChannelList (podcastsListMarkup) {
  return `
    <div class="main-container-podcast">
      <div class="podcast-channel-list page">
        <div class="podcast-list">${podcastsListMarkup}</div>
      </div>
    </div>
    `
}

export default podcastChannelList
