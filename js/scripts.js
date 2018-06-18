// make fucntion and eventually a prototype that takes today, and the task array ([frequency, weekDay, and monthDay])
// It will create a range of days starting from today to 28 days into the future
// return a list of dates

var today = new Date()
var taskArrayWater = ["weekly", "Thursday", undefined]

function makeSchedule() {
  var ddToday = today.getDate()
  console.log(ddToday)
  var daysLater = 28
  var nextDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysLater)
  return nextDay
}

makeSchedule()
