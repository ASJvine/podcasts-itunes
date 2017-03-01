import page from 'page'
import './styles/main.scss'

import podcastListPage from './containers/podcastListPage'
import podcastPage from './containers/podcastPage'
import episodePage from './containers/episodePage'

import * as utils from './utils'

const rootNode = document.getElementById('root')

page('/', podcastList)
page('/podcast/:podcastId', podcast)
page('/podcast/:podcastId/episode/:episodeId', episode)
// redirect if the URL does not match any on the listed above
page('*', podcastList)
page()

function podcastList () {
  utils.activateLoader()
  podcastListPage().then(html => {
    rootNode.innerHTML = html
    utils.stopLoader()
    utils.renderPodcastsLength()
  })
}

function podcast (ctx) {
  const { podcastId } = ctx.params
  utils.activateLoader()
  podcastPage({ podcastId }).then(html => {
    rootNode.innerHTML = html
    utils.stopLoader()
  })
}

function episode (ctx) {
  const { podcastId, episodeId } = ctx.params
  let sectionNode = document.getElementById('section')
  episodePage({ podcastId, episodeId }).then(html => {
    const divExists = document.getElementsByClassName('podcast-channel-episodes') > 0
    sectionNode.classList.remove('podcast-channel-episodes')
    sectionNode.classList.add('single-podcast')
    return sectionNode.innerHTML = html
  })
}
