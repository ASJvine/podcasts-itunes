import podcastChannelListItem from '../components/podcastChannelListItem'

function podcastChannelListContainer (data) {
  console.log('Data from podcastChannelListContainer', data)
  let podcastsMarkup = ''
  data.feed.entry.forEach((podcastChannel) => {
    podcastsMarkup += podcastChannelListItem(podcastChannel)
  })
  console.log('entry length', data.feed.entry.length)
  // @TODO [AdGo] Perform the injection to the html page
  // return $('.podcast-list').append(podcastsMarkup)
}

export default podcastChannelListContainer
