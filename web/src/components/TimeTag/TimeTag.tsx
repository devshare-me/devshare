const TimeTag = ({ datetime }) => {
  const now = new Date().getTime()
  const date = new Date(datetime).getTime()
  const diff = now - date

  let timeSince

  if (diff < 60000) {
    timeSince = 'now'
  } else if (diff < 3600000) {
    const min = Math.floor(diff / 60000)
    timeSince = (min > 0 ? min : 1) + 'm'
  } else if (diff < 86400000) {
    timeSince = Math.floor(diff / 3600000) + 'h'
  } else if (diff < 2592000000) {
    timeSince = Math.floor(diff / 86400000) + 'd'
  } else if (diff < 31104000000) {
    timeSince = Math.floor(diff / 2592000000) + 'mo'
  } else {
    timeSince = Math.floor(diff / 31104000000) + 'y'
  }

  return (
    <time dateTime={datetime} title={datetime}>
      {timeSince}
    </time>
  )
}

export default TimeTag
