import podcastChannelListContainer from './podcastChannelListContainer'

import itunesMethods from '../helpers/itunes'
import updateTime from '../utils/updateTime'

const DAYS = 1

export default function () {
  return new Promise((resolve, reject) => {
    const podcastsFromLS = localStorage.getItem('podcastsList')

    if (!podcastsFromLS) {
      console.log('Object empty > get the data from Itunes throught loadData')
      loadData().then(itunesData => {
        resolve(podcastChannelListContainer(itunesData.feed.entry))
      })
      return
    }
    if (updateTime(podcastsFromLS.date, DAYS)) {
      console.log('Object not empty BUT OLD DATAAAAA > update the data!')
      loadData().then(itunesData => {
        resolve(podcastChannelListContainer(itunesData.feed.entry))
      })
      return
    }
    console.log('Object not empty > get the data from localStorage!')
    resolve(podcastChannelListContainer(JSON.parse(podcastsFromLS).data.feed.entry))
  })
}

function loadData () {
  return itunesMethods.getItunesData()
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
