import podcastChannelListContainer from './podcastChannelListContainer'

import itunesMethods from '../helpers/itunes'
import updateTime from '../utils/updateTime'

const DAYS = 1

export default function () {
  return new Promise((resolve, reject) => {
    const podcastsFromLS = localStorage.getItem('podcastsList')

    if (!podcastsFromLS) {
      loadData().then(itunesData => {
        resolve(podcastChannelListContainer(itunesData.feed.entry))
      })
      return
    }
    if (updateTime(JSON.parse(podcastsFromLS).date, DAYS)) {
      loadData().then(itunesData => {
        resolve(podcastChannelListContainer(itunesData.feed.entry))
      })
      return
    }
    resolve(podcastChannelListContainer(JSON.parse(podcastsFromLS).data.feed.entry))
  })
}

function loadData () {
  return itunesMethods.getPodcastList()
    .then(JSON.parse)
    .then(itunesData => {
      localStorage.setItem('podcastsList', JSON.stringify({
        data: itunesData,
        date: Date.now() / 1000
      }))
      return itunesData
    })
    .catch(error => console.error('Failed!', error))
}
