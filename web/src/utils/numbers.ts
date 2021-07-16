export const roundNumber = (number) => {
  console.log(number)

  if (number < 1) {
    return (number.toFixed(2) * 1).toString()
  } else if (number < 100) {
    return (number.toFixed(1) * 1).toString()
  } else if (number < 999) {
    return Math.ceil(number)
  } else {
    return (
      (parseInt((Math.ceil(number) * 1).toString()) / 1000).toFixed(1) + 'k'
    )
  }
}

export const percentage = (number) => {
  return (number * 100).toFixed(1) + '%'
}
