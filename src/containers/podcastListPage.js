import itunesMethods from '../helpers/itunes'
import podcastChannelListContainer from './podcastChannelListContainer'
import isEmptyObject from '../utils/isEmptyObject'
import updateTime from '../utils/updateTime'

const DAYS = 1;
//for testing purposes
let podcastsList = {}

function loadData() {
  itunesMethods.getItunesData().then(itunesData => {
    podcastsList = {
      data: JSON.parse(itunesData),
      date: (Date.now()/1000)
    }
    // Put the object into storage
    localStorage.setItem('podcastsList', JSON.stringify(podcastsList));

    console.log("From list page > Podcast List", podcastsList);

    podcastChannelListContainer(podcastsList.data)
  }, function(error) {
  console.error("Failed!", error);
  })
}
debugger
if(isEmptyObject(podcastsList)) {
  console.log('Object empty > get data!');
  loadData()
} else {
    if(updateTime(podcastsList.date, DAYS)) {
      console.log('Object not empty > update the data!');
      loadData()
    } else {
      // Retrieve the object from storage
      podcastsList = localStorage.getItem('podcastsList');
    }
}

export default function () {
  return Promise.resolve('Podcast list page')
}
