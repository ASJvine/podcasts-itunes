import page from 'page'
import './styles/main.scss'

import podcastListPage from './containers/podcastListPage'
import podcastPage from './containers/podcastPage'
import episodePage from './containers/episodePage'

import stopLoader from './utils/stopLoader.js'
import podcastChannelsFound from './utils/podcastChannelsFound'

const rootNode = document.getElementById('root')

page.base('/')
page('/', podcastList)
page('/podcast/:podcast', podcast)
page('/podcast/:podcast/episode/:episode', episode)
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
  console.log('ctx.params', ctx.params)
  const { podcast } = ctx.params
  console.log('podcast page', podcast)
  podcastPage({ podcast }).then(html => { rootNode.innerHTML = html })
}

function episode (ctx) {
  const { podcast, episode } = ctx.params
  console.log('episode page', podcast, episode)
  episodePage({ podcast, episode }).then(html => { rootNode.innerHTML = html })
}
