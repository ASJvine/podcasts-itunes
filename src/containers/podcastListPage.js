import * as itunes from '../utils/itunes'
import * as utils from '../utils'
import podcastListItem from '../components/podcastListItem'

document.addEventListener('keyup', onKeyup)

export default function podcastListPage () {
  return new Promise((resolve, reject) => {
    const podcastsFromLS = localStorage.getItem('podcasts')
    if (!podcastsFromLS || utils.isLsPodcastDataStale(JSON.parse(podcastsFromLS).date)) {
      console.log('fetching podcasts')
      itunes.getPodcasts()
        .then(savePodcastsToLs)
        .then(markup)
        .then(resolve)
      return
    }
    resolve(
      markup(JSON.parse(podcastsFromLS).data)
    )
  })
}

function markup (podcasts) {
  const podcastListMarkup = podcasts
    .map(podcastListItem)
    .join(' ')
  return `
    <div class="field">
      <div class="channels-found" id="podcast-length">0</div>
      <form id="search-wrapper">
        <input type="text" placeholder="Filter podcasts.." class="search" id="podcast-list-filter">
      </form>
    </div>
    <div class="podcast-list-item-list page">
      <div class="podcast-list">${podcastListMarkup}</div>
    </div>
  `
}

function savePodcastsToLs (podcasts) {
  localStorage.setItem('podcasts', JSON.stringify({
    data: podcasts,
    date: Date.now() / 1000
  }))
  return podcasts
}

function onKeyup ({ target }) {
  if (target.id !== 'podcast-list-filter') {
    return
  }
  const query = new RegExp(target.value, 'i')
  JSON.parse(localStorage.getItem('podcasts')).data
    .forEach(podcast => {
      const node = utils.el(podcast.id.attributes['im:id'])
      podcast.title.label.match(query)
        ? node.classList.remove('hidden')
        : node.classList.add('hidden')
    })
  utils.renderPodcastsLength()
}
