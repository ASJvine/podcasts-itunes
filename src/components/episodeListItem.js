export default function episodeListItem (item) {
  const title = item.title
  const pubDate = item.pubDate
  const duration = item['itunes:duration']

  return `
    <div class="table-row">
      <div class="table-row-item" data-header="Header1">${title}</div>
      <div class="table-row-item" data-header="Header2">${pubDate}</div>
      <div class="table-row-item" data-header="Header3">${duration}</div>
    </div>
  `
}
