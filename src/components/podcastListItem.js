export default function podcastListItem (podcast) {
  const image = podcast['im:image'][2].label
  const label = podcast['im:name'].label
  const author = podcast['im:artist'].label
  const id = podcast['id'].attributes['im:id']

  return `
    <a class="podcast-list-item" id=${id} href="/podcast/${id}">
      <div class="podcast-list-item-photo">
        <img src=${image} alt="Photo of ${label}" class="podcast-list-item-photo">
      </div>
      <div class="podcast-list-item-info">
        <div class="podcast-list-item-label">${label}</div>
        <div class="podcast-list-item-author">Author: ${author}</div>
      </div>
    </a>
  `
}
