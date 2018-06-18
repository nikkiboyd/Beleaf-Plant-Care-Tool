// make fucntion and eventually a prototype that takes today, and the task array ([frequency, weekDay, and monthDay])
// It will create a range of days starting from today to 28 days into the future
// return a list of dates

var today = new Date()

// input 1:
var taskArrayWater = ["weekly", "thursday"]
// output 1:
// [Thursday June 21 Date object, June 28 Date object, July 5 date object, July 12]

// input 2:
var taskArrayFert = ["monthly", 18]
// output 2:
// [Wednesday, July 18th]

// use this with index of
var weekdayArray=["sunday", "monday","tuesday",
"wednesday","thursday","friday","saturday"]

function makeSchedule(taskArrayWater) {
  var finalDays = []
  var ddToday = today.getDate()
  var daysLater = 28
  var fourWeeksLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysLater)

  // account for weekly tasks
  if (taskArrayWater[0] === "weekly") {
    var firstDay = new Date()
    var dayOfWeek = firstDay.getDay()
    while(firstDay.getDay() !== weekdayArray.indexOf(taskArrayWater[1])){
      firstDay.setDate(firstDay.getDate() + 1)
    }
    finalDays.push(firstDay)
    console.log(firstDay)

    finalDays.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 7))
    finalDays.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 14))
    finalDays.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 21))
  }
  console.log(finalDays)
  return finalDays
}

makeSchedule(taskArrayWater)
