import itunesMethods from '../helpers/itunes'
import podcastChannelListContainer from './podcastChannelListContainer'


let podcastsList

itunesMethods.getItunesData().then(itunesData => {
  podcastsList = {
    data: JSON.parse(itunesData),
    date: Date.now()
  }
  console.log("From list page > Podcast List", podcastsList);
  podcastChannelListContainer(podcastsList.data)
}, function(error) {
console.error("Failed!", error);
})

console.log("Outside the promise > ListPage", podcastsList);

export default function () {
  return Promise.resolve('Podcast list page')
}
