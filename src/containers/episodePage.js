import episodeItem from '../components/episodeItem'

export default function episodePage ({podcastId, episodeId}) {
  return new Promise((resolve, reject) => {
    const singlePodcastFromLS = JSON.parse(localStorage.getItem(podcastId))
    let item = singlePodcastFromLS.data.item[episodeId]
    resolve(episodeItem(item))
  })
}
