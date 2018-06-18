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



var allPlantTemplates = []

$(function(){
  document.getElementById("selectPlant").onchange = function(){
    var plantName = $("#selectPlant :selected").text()
    console.log(plantName)
    for(plant = 0; plant < allPlantTemplates.length; ++plant){
      if(plantName === allPlantTemplates[plant].commonName){
        var sunlight = allPlantTemplates[plant].sunlight
        var hardiness = allPlantTemplates[plant].hardiness
        var waterFrequency = allPlantTemplates[plant].water[0]
        var pruningFrequency = allPlantTemplates[plant].pruning[0]
        var fertilizingFrequency = allPlantTemplates[plant].fertilizing[0]
       $("#sunlightSelection").val(sunlight);
       $("#hardinessSelection").val(hardiness);
       $("#waterSelection").val(waterFrequency);
       $("#pruningSelection").val(pruningFrequency);
       $("#fertilizingSelection").val(fertilizingFrequency);
      }
    }
  };
    document.getElementById("waterSelection").onchange = function(){
    var monthSelection = $("#waterSelection :selected").text()
    if (monthSelection === "Once a month") {
      $("#waterWeekdaySelection").hide();
      $("#waterMonthSelection").show();
      console.log("in the if section")
    } else {
      $("#waterMonthSelection").hide();
      $("#waterWeekdaySelection").show();
    }
  };
});



function Plant(commonName, sunlight, hardiness, water, pruning, fertilizing){
  this.commonName = commonName
  this.sunlight = sunlight
  this.hardiness = hardiness
  this.water = water
  this.pruning = pruning
  this.fertilizing = fertilizing
}

var spider = new Plant ("Spider Plant", "Part Sun", "Very Tolerant", ["Every other week"], ["Once a month"], ["Every other week"])
allPlantTemplates.push(spider)

//test user input
var spidey = new Plant ("spider", "full", ["weekly"])
spidey.nickname = "spidey"
spidey.location = "next to window"



 // pruning, rotating, misting, fertilizing, location
