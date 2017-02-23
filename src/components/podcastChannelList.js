function podcastChannelList (podcastsListMarkup) {
  return `
    <div class="field">
      <div class="channels-found">100</div>
      <form id="search-wrapper">
        <input type="text" placeholder="Filter podcasts.." class="search">
      </form>
    </div>
    <div class="podcast-channel-list page">
      <div class="podcast-list">${podcastsListMarkup}</div>
    </div>
    `
}

export default podcastChannelList
