export const renderPodcastsLength = () => {
  el('podcast-length').innerHTML = document.querySelectorAll('.podcast-list-item:not(.hidden)').length
}

export const stopLoader = () => {
  el('loader').classList.add('stopped')
}

export const activateLoader = () => {
  el('loader').classList.remove('stopped')
}

export const el = id => {
  return document.getElementById(id)
}

export const isLsPodcastDataStale = timestamp => {
  const daysToSeconds = 24 * 60 * 60
  const limitDate = timestamp + daysToSeconds
  const currentDate = Date.now() / 1000
  return currentDate > limitDate
}
