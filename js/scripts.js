var today = new Date()

var weekdayArray=["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

var monthArray = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"]

Plant.prototype.makeSchedule = function(taskKey) {
  var finalDays = []
  var ddToday = today.getDate()
  var daysLater = 40
  var fourWeeksLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysLater)

  if (taskKey[0] === "Once a week") {
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
  } else if (taskKey[0] === "Twice a week"){
    var firstDay = new Date()
    var secondDay = new Date()
    var twoDays = [taskKey[1], taskKey[2]];
    while(firstDay.getDay() !== weekdayArray.indexOf(taskKey[1])){
      firstDay.setDate(firstDay.getDate() + 1)
    }
    finalDays.push(firstDay)
    finalDays.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 7))
    finalDays.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 14))
    finalDays.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 21))

    while(secondDay.getDay() !== weekdayArray.indexOf(taskKey[2])){
      secondDay.setDate(secondDay.getDate() + 1)
    }
    finalDays.push(secondDay)
    finalDays.push(new Date(secondDay.getFullYear(), secondDay.getMonth(), secondDay.getDate() + 7))
    finalDays.push(new Date(secondDay.getFullYear(), secondDay.getMonth(), secondDay.getDate() + 14))
    finalDays.push(new Date(secondDay.getFullYear(), secondDay.getMonth(), secondDay.getDate() + 21))

    finalDays.sort(compareDatesFunc)
    return finalDays
  } else if (taskKey[0] === "Once a month") {
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
var allUserPlants = []

//business logic
function Plant(commonName, sunlight, hardiness, water, pruning, fertilizing){
  this.commonName = commonName
  this.sunlight = sunlight
  this.hardiness = hardiness
  this.water = water
  this.pruning = pruning
  this.fertilizing = fertilizing
}

function compareDatesFunc(a, b){
  return (a - b);
}

function makeCalendar(everyPlant, userDays) {
  everyPlant.forEach(function(plant) {
    // debugger
    var waterDays = plant.makeSchedule(plant.water)
    console.log(waterDays)
    userDays = userDays.concat(waterDays)
    var pruningDays = plant.makeSchedule(plant.pruning)
    userDays = userDays.concat(pruningDays)
    var fertilizingDays = plant.makeSchedule(plant.fertilizing)
    userDays = userDays.concat(fertilizingDays)
  })
  userDays.sort(compareDatesFunc)
  console.log(userDays)
}

var testWeeklyPlantWater = new Plant("commonName", "sunlight", "hardiness", ["Weekly", "Saturday"], ["Once a month"], ["Every other week"])
var testArrayDates = testWeeklyPlantWater.makeSchedule(testWeeklyPlantWater.water)

//user logic
$(function(){
  document.getElementById("waterSelection").onchange = function(){
    var elementId = "#waterSelection"
    showHideMonthWeek(elementId)
  };

  document.getElementById("pruningSelection").onchange = function(){
    var elementId = "#pruningSelection"
    showHideMonthWeek(elementId)
  };

  document.getElementById("fertilizingSelection").onchange = function(){
    var elementId = "#fertilizingSelection"
    showHideMonthWeek(elementId)
  };

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
       showHideMonthWeek("#waterSelection");
       $("#pruningSelection").val(pruningFrequency);
       showHideMonthWeek("#pruningSelection");
       $("#fertilizingSelection").val(fertilizingFrequency);
       showHideMonthWeek("#fertilizingSelection");
       $("#commonNameDiv").hide()
     } else if (plantName === "Create your own") {
        $("#commonNameDiv").show()
        document.getElementById("plantEntryForm").reset();
        $("#selectPlant").val("Create your own");
        showHideMonthWeek("#waterSelection");
        showHideMonthWeek("#pruningSelection");
        showHideMonthWeek("#fertilizingSelection");
     }
    }
  };
  $("#refreshButton").click(function(event){
    event.preventDefault();
    var everyPlant = allPlantTemplates.concat(allUserPlants);
    var userDays = []
    makeCalendar(everyPlant, userDays);
    testArrayDates.forEach(function(date){
      var dayOfWeekString = weekdayArray[date.getDay()]
      var monthString = monthArray[date.getMonth()]
      var dateOfMonth = date.getDate()
      var year = date.getFullYear()
      var formattedDate = dayOfWeekString + ", " + monthString + " " + dateOfMonth + ", " + year
      $("p").append("<div class='form-check'>" +
                        "<input class='form-check-input' type='checkbox' id='defaultCheck1'>" +
                        "<label class='form-check-label' for='defaultCheck1'>" +
                          "Value from other team" +
                        "</label>" +
                      "</div>")
    });
  });
});
function showHideMonthWeek(elementId){
  var monthSelection = $(elementId + " :selected").text()
  if (monthSelection === "Once a month") {
    $(elementId + "Weekday").hide();
    $(elementId + "Month").show();
  } else if (monthSelection.search("week") > -1) {
    $(elementId + "Month").hide();
    $(elementId + "Weekday").show();
  } else {
    $(elementId + "Month").hide();
    $(elementId + "Weekday").hide();
  }
}

// Test Plants

var spider = new Plant ("Spider Plant", "Part Sun", "Very Tolerant", ["Every other week", "Thursday"], ["Once a month", 6], ["Every other week", "Monday"])
allPlantTemplates.push(spider)

var snake = new Plant ("Snake Plant", "Indirect Sun", "Very Tolerant", ["Once a month", 22], ["Once a month", 14], ["Once a month", 2])
allPlantTemplates.push(snake)

var maple = new Plant ("Japanese Maple", "Part Sun", "Temperamental", ["Twice a week", "Wednesday", "Thursday"], ["Once a month", 2], ["Once a month", 2])
allPlantTemplates.push(maple)

var xmascactus = new Plant ("Christmas Cactus", "Shade", "Average", ["Once a week", "Thursday"], ["Once a month", 13], ["Every other week", "Friday"])
allPlantTemplates.push(xmascactus)

var aralia = new Plant ("Japanese Aralia", "Shade", "Average", ["Once a week", "Saturday"], ["Once a month", 17], ["Once a month", 19])
allPlantTemplates.push(aralia)

var peacelily = new Plant ("Peace Lily", "Indirect Sun", "Very Tolerant", ["Twice a week", "Sunday", "Friday"], ["Once a month", 1], ["Every other week", "Monday"])
allPlantTemplates.push(peacelily)

var asparagus = new Plant ("Asparagus Fern", "Part Sun", "Temperamental", ["Once a week", "Tuesday"], ["Once a month", 16], ["Once a month", 6])
allPlantTemplates.push(asparagus)

var dracena = new Plant ("Dracena", "Indirect Sun", "Very Tolerant", ["Every other week", "Wednesday"], ["Once a month", 14], ["Every other week", "Thursday"])
allPlantTemplates.push(dracena)

var testMonthlyPlantPruning = new Plant("commonName", "sunlight", "hardiness", ["Weekly", "Saturday"], ["Twice a week", "Tuesday", "Thursday"], ["Every other week"])
// console.log(testMonthlyPlantPruning.makeSchedule(testMonthlyPlantPruning.pruning));

var testEOWPlantFert = new Plant("commonName", "sunlight", "hardiness", ["Weekly", "Saturday"], ["Once a month", 14], ["Every other week", "Monday"])

// pruning, rotating, misting, fertilizing, location
