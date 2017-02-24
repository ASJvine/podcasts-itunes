export default function getCorsData (url) {
  // Return a new promise
  return new Promise(function (resolve, reject) {
    let req = createCORSRequest('GET', url)
    console.log('[createCORSRequest]', req)
    if (!req) {
      alert('CORS not supported')
      return
    }

    // Response handlers.
    req.onload = function () {
      // This is called even on 404 etc
      // so check the status
      if (req.status === 200) {
        var text = req.responseText
        console.log('[text req.responseText]', text)
        // Resolve the promise with the response text
        resolve(req.response)
      } else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText))
      }
    }

    // Handle network errors
    req.onerror = function () {
      reject(Error('Woops, there was an error making the CORS request.'))
    }

    req.send()
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
