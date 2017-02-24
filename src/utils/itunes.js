import * as http from './http'

export const getPodcasts = () => {
  return http.GET('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
    .then(JSON.parse)
    .then(({ feed }) => feed.entry)
}
