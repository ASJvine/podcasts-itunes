// Check localStorage is up-to-date
export default function updateTime (objDate, days) {
  const daysToSeconds = 24 * 60 * 60
  const limitDate = objDate + daysToSeconds
  const currentDate = Date.now() / 1000
  return currentDate > limitDate
}
