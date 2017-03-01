import * as utils from '../utils'

export default function episodeListItem (item, podcastId, index) {
  const episodeId = index
  const title = item.title
  const pubDate = utils.formatDate(item.pubDate)
  const duration = utils.formatDuration(item['itunes:duration'])

  return `
    <div class="table-row">
      <a class="table-row-item" data-header="Header1" id="${episodeId}" href="/podcast/${podcastId}/episode/${episodeId}">${title}</a>
      <div class="table-row-item" data-header="Header2">${pubDate}</div>
      <div class="table-row-item" data-header="Header3">${duration}</div>
    </div>
  `
}
