import page from 'page'
import './styles/main.scss'

import podcastListPage from './containers/podcastListPage'
import podcastPage from './containers/podcastPage'
import episodePage from './containers/episodePage'

import stopLoader from './utils/stopLoader.js'
import podcastChannelsFound from './utils/podcastChannelsFound'

const rootNode = document.getElementById('root')

page('/', podcastList)
page('/podcast/:podcastId', podcast)
page('/podcast/:podcastId/episode/:episode', episode)
// redirect if the URL does not match any on the listed above
page('*', podcastList)
page()

function podcastList () {
  console.log('podcastList page')
  podcastListPage().then(html => {
    rootNode.innerHTML = html
    stopLoader('.loader')
    podcastChannelsFound('.podcast-channel')
  })
}

function podcast (ctx) {
  const { podcastId } = ctx.params
  podcastPage({ podcastId }).then(html => { rootNode.innerHTML = html })
}

function episode (ctx) {
  const { podcastId, episodeId } = ctx.params
  console.log('episode page', podcastId, episodeId)
  episodePage({ podcastId, episodeId }).then(html => { rootNode.innerHTML = html })
}
