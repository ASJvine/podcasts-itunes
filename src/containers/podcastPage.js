import * as itunes from '../utils/itunes'

export default function ({ podcastId }) {
  return Promise.resolve(`Podcast page: ${podcastId}`)
}
