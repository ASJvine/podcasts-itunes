import podcastChannelList from '../components/podcastChannelList'
import $ from 'zepto-modules';

function podcastChannelListContainer(data) {
  console.log("Data from podcastChannelListContainer", data);
  let podcasts_markup = ''
  data.feed.entry.forEach((podcastChannel) => {
    podcasts_markup += podcastChannelList(podcastChannel)
  })
  console.log("entry length", data.feed.entry.length);
  // @TODO [AdGo] Perform the injection to the html page
  // return $('.podcast-list').append(podcasts_markup)
}

export default podcastChannelListContainer
