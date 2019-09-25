const DATE_NOW = 86400
export function countDate(targetDate) {
  let Today = new Date()
  let endDate = new Date(targetDate)
  let leftTime = endDate.getTime() - Today.getTime()
  if (endDate.getTime() < Today.getTime()) {
    return false
  }
  let leftSecond = Number(leftTime / 1000)
  let Day = Math.floor(leftSecond / DATE_NOW)
  let Hour = Math.floor((leftSecond - Day * DATE_NOW) / 3600)
  let Minute = Math.floor((leftSecond - Day * DATE_NOW - Hour * 3600) / 60)
  let Second = Math.floor(
    leftSecond - Day * DATE_NOW - Hour * 3600 - Minute * 60
  )
  return {
    Day,
    Hour,
    Minute,
    Second
  }
}
