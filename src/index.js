import page from 'page'
import './styles/main.scss'

import podcastListPage from './containers/podcastListPage'
import podcastPage from './containers/podcastPage'
import episodePage from './containers/episodePage'
import episodesPage from './containers/episodesPage'

import * as utils from './utils'

const rootNode = document.getElementById('root')

page('/', podcastList)
page('/podcast/:podcastId', episodes)
page('/podcast/:podcastId/episode/:episodeId', episode)
// redirect if the URL does not match any on the listed above
page('*', podcastList)
page()

function podcastList () {
  utils.activateLoader()
  podcastListPage()
    .then(html => {
      rootNode.innerHTML = html
      utils.stopLoader()
      utils.renderPodcastsLength()
    })
    .catch(console.error)
}

function episodes (ctx) {
  const { podcastId } = ctx.params
  utils.activateLoader()
  if (utils.podcastPageLoaded()) {
    episodesPage({ podcastId })
      .then(episodesPageHtml => {
        const containerNode = document.getElementById('podcast-children-container')
        containerNode.innerHTML = episodesPageHtml
        utils.stopLoader()
      })
      .catch(console.error)
    return
  }

  podcastPage({ podcastId })
    .then(podcastPageHtml => {
      rootNode.innerHTML = podcastPageHtml
    })
    .then(() => episodesPage({ podcastId }))
    .then(episodesPageHtml => {
      const containerNode = document.getElementById('podcast-children-container')
      containerNode.innerHTML = episodesPageHtml
      utils.stopLoader()
    })
    .catch(console.error)
}

function episode (ctx) {
  // check if container exists first!
  const { podcastId, episodeId } = ctx.params
  utils.activateLoader()
  if (utils.podcastPageLoaded()) {
    episodePage({ podcastId, episodeId })
      .then(html => {
        const containerNode = document.getElementById('podcast-children-container')
        containerNode.innerHTML = html
        utils.stopLoader()
        console.log('hello1')
      })
      .catch(console.error)
    return
  }

  podcastPage({ podcastId })
    .then(podcastPageHtml => {
      rootNode.innerHTML = podcastPageHtml
    })
    .then(() => episodePage({ podcastId, episodeId }))
    .then(episodePageHtml => {
      const containerNode = document.getElementById('podcast-children-container')
      containerNode.innerHTML = episodePageHtml
      utils.stopLoader()
      console.log('hello2')
    })
    .catch(console.error)
}
