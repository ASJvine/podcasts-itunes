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

export const formatDate = (str) => {
  let d = new Date(str)
  return `${d.getUTCDay()}/${d.getUTCMonth()}/${d.getFullYear()}`
}

export const formatDuration = (str) => {
  let seconds = Number(str)
  return Number.isInteger(seconds) ? new Date(seconds * 1000).toISOString().substr(11, 8) : str
}

export const podcastPageLoaded = () => {
  return !!document.getElementById('podcast-children-container')
}
