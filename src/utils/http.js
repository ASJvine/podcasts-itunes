export const GET = url => {
  // Return a new promise.
  return new Promise(function (resolve, reject) {
    // Do the usual XHR stuff
    let req = new XMLHttpRequest()
    req.open('GET', url)

    req.onload = onload
    req.onerror = onerror
    // Make the request
    req.send()

    function onload () {
      // This is called even on 404 etc
      // so check the status
      if (req.status !== 200) {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText))
        return
      }
      // Resolve the promise with the response text
      resolve(req.response)
    }
    // Handle network errors
    function onerror () {
      reject(Error('Network Error'))
    }
  })
}
