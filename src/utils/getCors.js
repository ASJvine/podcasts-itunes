 // NOT USED, previous attempt of getting itunes CORS resources
export default function getCorsData (url) {
  // Return a new promise
  return new Promise(function (resolve, reject) {
    let req = createCORSRequest('GET', url)
    if (!req) {
      console.warn('CORS not supported')
      return
    }

    req.onload = onload
    req.onerror = onerror
    req.send()

    function onload () {
      // This is called even on 404 etc
      // so check the status
      if (req.status !== 200) {
        reject(req.statusText)
        return
      }
      resolve(req.response)
    }
    // Handle network errors
    function onerror () {
      reject(Error('Woops, there was an error making the CORS request.'))
    }
  })
}

// Create the XHR object.
function createCORSRequest (method, url) {
  var xhr = new XMLHttpRequest()

  if ('withCredentials' in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true)
    xhr.withCredentials = true // sets the credentials to true
  } else if (typeof XDomainRequest !== 'undefined') {
    // XDomainRequest for IE.
    xhr = new XDomainRequest()
    xhr.open(method, url)
  } else {
    // CORS not supported.
    xhr = null
  }
  // xhr.responseType = "json"
  return xhr
}
