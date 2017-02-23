export default function podcastChannelsFound (className) {
  var number = document.querySelectorAll(className).length
  document.querySelector('.channels-found').innerHTML = number.toString()
}
