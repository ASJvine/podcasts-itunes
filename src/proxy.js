let http = require('http')
let https = require('https')
let url = require('url')
let parser = require('xml2json')

// Create http server
const server = http.createServer(function (request, response) {
    // Parse url for query parameter
  let parts = url.parse(request.url, true)
  let query = parts.query
  let mode

  // Determine whether to fetch data through http or https
  if (query.url.indexOf('https') === 0) {
    mode = https
  } else {
    mode = http
  }
  // Fire http call
  mode.get(query.url, function (resp) {
    var finalData = ''
    // Receive chunks of data. Append to final data.
    resp.on('data', function (chunk) {
      finalData += chunk
    })
    // After all chunks received, send the finalData as response
    resp.on('end', function () {
      // Allow all origin for cross domain request
      response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })

      let json
      // Parse xml to json
      try {
        json = parser.toJson(finalData)
      } catch (err) {
        console.error('[err] parsing the json', err)
      }
      response.write(json)
      response.end()
    })
  }).on('error', function (e) {
    console.log('Got error: ' + e.message)
  })
})

server.listen(3030)
console.log('Proxy server is listening on 3030')
