
var today = new Date()

// use this with index of


Plant.prototype.makeSchedule = function(taskKey) {
  var finalDays = []
  var ddToday = today.getDate()
  var daysLater = 28
  var fourWeeksLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysLater)
  var weekdayArray=["sunday", "monday","tuesday","wednesday","thursday","friday","saturday"]
  if (taskKey[0] === "Weekly") {
    var firstDay = new Date()
    var dayOfWeek = firstDay.getDay()
    while(firstDay.getDay() !== weekdayArray.indexOf(taskKey[1])){
      firstDay.setDate(firstDay.getDate() + 1)
    }
    finalDays.push(firstDay)
    finalDays.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 7))
    finalDays.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 14))
    finalDays.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 21))
    return finalDays
  } else if (taskKey[0] === "Every other week"){
    var firstDay = new Date()
    var dayOfWeek = firstDay.getDay()
    while(firstDay.getDay() !== weekdayArray.indexOf(taskKey[1])){
      firstDay.setDate(firstDay.getDate() + 1)
    }
    finalDays.push(firstDay)
    finalDays.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 14))
    return finalDays

  } else if (taskKey[0] === "Once a month"){
    var firstDay = new Date()
    while(firstDay < fourWeeksLater) {
      if (firstDay.getDate() === taskKey[1]) {
      finalDays.push(firstDay)
      return finalDays
      } else {
        firstDay = new Date (firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 1)
      }
    }
  }
}

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


// spider.makeSchedule(spider.water)

// Test Plants
var testWeeklyPlantWater = new Plant("commonName", "sunlight", "hardiness", ["Weekly", "saturday"], ["Once a month"], ["Every other week"])
console.log(testWeeklyPlantWater.makeSchedule(testWeeklyPlantWater.water))


var testMonthlyPlantPruning = new Plant("commonName", "sunlight", "hardiness", ["Weekly", "saturday"], ["Once a month", 14], ["Every other week"])
console.log(testMonthlyPlantPruning.makeSchedule(testMonthlyPlantPruning.pruning));

var testEOWPlantFert = new Plant("commonName", "sunlight", "hardiness", ["Weekly", "saturday"], ["Once a month", 14], ["Every other week", "monday"])
console.log(testEOWPlantFert.makeSchedule(testEOWPlantFert.fertilizing));
 // pruning, rotating, misting, fertilizing, location
