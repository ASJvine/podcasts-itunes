import podcastChannelListItem from '../components/podcastChannelListItem'
import podcastChannelList from '../components/podcastChannelList'

function podcastChannelListContainer (data) {
  let podcastsListMarkup = ''
  data.forEach((podcastChannel) => {
    podcastsListMarkup += podcastChannelListItem(podcastChannel)
  })
  return podcastChannelList(podcastsListMarkup)
}

export default podcastChannelListContainer
