import podcastChannelListItem from '../components/podcastChannelListItem'
import podcastChannelList from '../components/podcastChannelList'

function podcastChannelListContainer (data) {
  let podcastsListMarkup = ''
  data.forEach((podcastChannel) => {
    podcastsListMarkup += podcastChannelListItem(podcastChannel)
  })
  console.log('entry length', data.length)
  // @TODO [AdGo] Perform the injection to the html page
  // return $('.podcast-list').append(podcastsMarkup)
  return podcastChannelList(podcastsListMarkup)
}

export default podcastChannelListContainer
