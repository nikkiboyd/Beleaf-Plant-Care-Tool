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
    // console.log(finalDays)
    return finalDays
  } else if (taskKey[0] === "Every other week"){
    var firstDay = new Date()
    var dayOfWeek = firstDay.getDay()
    while(firstDay.getDay() !== weekdayArray.indexOf(taskKey[1])){
      firstDay.setDate(firstDay.getDate() + 1)
    }
    finalDays.push(firstDay)
    finalDays.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 14))
    // console.log(finalDays)
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
    // console.log(finalDays)
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

function compareFirstElementDatesFunc(a, b){
  return (a[0] - b[0]);
}

function sortIntoWeeksAndFormat(allEvents) {
  var weekOneRange = [today, (new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6))];
  var weekTwoRange = [(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)), (new Date(today.getFullYear(), today.getMonth(), today.getDate() + 13))]
  var weekThreeRange = [(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14)), (new Date(today.getFullYear(), today.getMonth(), today.getDate() + 20))]
  var weekFourRange = [(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 21)), (new Date(today.getFullYear(), today.getMonth(), today.getDate() + 27))]
  var glanceRange = [(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 28)), (new Date(today.getFullYear(), today.getMonth(), today.getDate() + 40))]

  var weekOneEvents = [];
  var weekTwoEvents = [];
  var weekThreeEvents = [];
  var weekFourEvents = [];
  var glanceEvents = [];

  allEvents.sort(compareFirstElementDatesFunc);
  console.log(allEvents)
  for(i = 0; i < dateArray.length; i++) {
    var dayOfWeekString = weekdayArray[dateArray[i].getDay()]
    var monthString = monthArray[dateArray[i].getMonth()]
    var dateOfMonth = dateArray[i].getDate()
    var year = dateArray[i].getFullYear()
    var formattedDate = dayOfWeekString + ", " + monthString + " " + dateOfMonth + ", " + year

    if (dateArray[i] >= weekOneRange[0] && dateArray[i] <= weekOneRange[1]) {
      weekOneEvents.push(dateArray[i]);
      // $("#week-one-tasks").append("<div class='form-check'>" +
      //                     "<label class='form-check-label'>" +
      //                     "<input class='form-check-input' type='checkbox'>" +
      //                     property + " " + plant.commonName + " on " + dateArray[i] +
      //                     "</label>" +
      //                     "</div>")
    } else if (dateArray[i] >= weekTwoRange[0] && dateArray[i] <= weekTwoRange[1]) {
      weekTwoEvents.push(dateArray[i]);
      // $("#week-two-tasks").append("<div class='form-check'>" +
      //                     "<label class='form-check-label'>" +
      //                     "<input class='form-check-input' type='checkbox'>" +
      //                     property + " " + plant.commonName + " on " + dateArray[i] +
      //                     "</label>" +
      //                     "</div>")
    } else if (dateArray[i] >= weekThreeRange[0] && dateArray[i] <= weekThreeRange[1]) {
      weekThreeEvents.push(dateArray[i]);
      // $("#week-three-tasks").append("<div class='form-check'>" +
      //                     "<label class='form-check-label'>" +
      //                     "<input class='form-check-input' type='checkbox'>" +
      //                     property + " " + plant.commonName + " on " + dateArray[i] +
      //                     "</label>" +
      //                     "</div>")
    } else if (dateArray[i] >= weekFourRange[0] && dateArray[i] <= weekFourRange[1]) {
      weekFourEvents.push(dateArray[i]);
      // $("#week-four-tasks").append("<div class='form-check'>" +
      //                     "<label class='form-check-label'>" +
      //                     "<input class='form-check-input' type='checkbox'>" +
      //                     property + " " + plant.commonName + " on " + dateArray[i] +
      //                     "</label>" +
      //                     "</div>")
    } else if (dateArray[i] >= glanceRange[0] && dateArray[i] <= glanceRange[1]) {
      glanceEvents.push(dateArray[i]);
      // $("#week-glance-tasks").append("<div class='form-check'>" +
      //                     "<label class='form-check-label'>" +
      //                     "<input class='form-check-input' type='checkbox'>" +
      //                     property + " " + plant.commonName + " on " + dateArray[i] +
      //                     "</label>" +
      //                     "</div>")
    } else {
      glanceEvents.push(dateArray[i]);
      // $("#week-glance-tasks").append("<div class='form-check'>" +
      //                     "<label class='form-check-label'>" +
      //                     "<input class='form-check-input' type='checkbox'>" +
      //                     "Else: " + property + " " + plant.commonName + " on " + dateArray[i] +
      //                     "</label>" +
      //                     "</div>")
    }
  }
  plantPropSpecificArray[0] = weekOneEvents
  plantPropSpecificArray[1] = weekTwoEvents
  plantPropSpecificArray[2] = weekThreeEvents
  plantPropSpecificArray[3] = weekFourEvents
  plantPropSpecificArray[4] = glanceEvents
  // console.log(plantPropSpecificArray)
  return plantPropSpecificArray
}

function makeCalendar(everyPlant) {
  var allEvents = [];
  everyPlant.forEach(function(plant) {

    var waterDays = plant.makeSchedule(plant.water)
    for (i = 0; i < waterDays.length; i++) {
      var singleWaterEvent = [];
      singleWaterEvent.push(waterDays[i], plant.commonName, "Water");
      allEvents.push(singleWaterEvent)
    }

    var pruningDays = plant.makeSchedule(plant.pruning)
    for (x = 0; x < pruningDays.length; x++) {
      var singlePruneEvent = [];
      singlePruneEvent.push(pruningDays[x], plant.commonName, "Prune");
      allEvents.push(singlePruneEvent)
    }

    var fertilizingDays = plant.makeSchedule(plant.fertilizing)
    for (y = 0; y < fertilizingDays.length; y++) {
      var singleFertilizeEvent = [];
      singleFertilizeEvent.push(fertilizingDays[y], plant.commonName, "Fertilize");
      allEvents.push(singleFertilizeEvent)
    }
  });
  return allEvents;
}

var testWeeklyPlantWater = new Plant("commonName", "sunlight", "hardiness", ["Weekly", "Saturday"], ["Once a month"], ["Every other week"])
var testArrayDates = testWeeklyPlantWater.makeSchedule(testWeeklyPlantWater.water)

function updatePlantDetails(elementId, detail){
  var dropdown = document.getElementById(elementId)
  for (i=0; i < dropdown.options.length; ++i){
   if(dropdown.options[i].text === detail){
     dropdown.selectedIndex = i
     break
   } else{
     dropdown.selectedIndex = 0
   }
  }
}

function checkboxlimit(checkgroup, limit){
  var checkgroup=checkgroup
  var limit=limit
  for (var i=0; i<checkgroup.length; i++){
    checkgroup[i].onclick=function(){
    var checkedcount=0
    for (var i=0; i<checkgroup.length; i++)
      checkedcount+=(checkgroup[i].checked)? 1 : 0
    if (checkedcount>limit){
      alert("You can only select a maximum of "+limit+" checkboxes")
      this.checked=false
      }
    }
  }
}

//user logic
$(function(){

  $("#plantEntryForm").submit(function(event){
    event.preventDefault();
    var nickName = $("#nickNameInput").val()
    var commonName = $("#commonNameInput").val()
    var sunlight = $("#sunlightSelection :selected").text()
    var hardiness = $("#hardinessSelection :selected").text()
    var water =  $("#waterSelection :selected").text()
    var waterCheckBoxes = []
    $("input:checkbox[name=waterDayCheckBoxes]:checked").each(function(){
      waterCheckBoxes.push($(this).val());
    })
    var waterArray =[]
    var waterMonthday = $("#waterMonthDropdown :selected").text()
    var prune = $("#pruningSelection :selected").text()
    var pruneWeekday = $("#pruningSelectionWeekday :checked").val()
    var pruneMonthday = $("#pruneMonthDropdown :selected").text()
    var fertilizing = $("#fertilizingSelection :selected").text()
    var fertilizeWeekday = $("#fertilizingSelectionWeekday :checked").val()
    var fertilizeMonthday = $("#fertilizingMonthDropdown :selected").text()

    //NEED TO UP TO MAKE SURE USER HAS SELECTED ALL NECESSARY SELECTIONS FOR ALL FIELDS
    if(waterCheckBoxes.length > 0){
      waterArray.push(water)
      console.log("water array: " + waterArray)
      for(i=0; i< waterCheckBoxes.length; ++i){
        waterArray.push(waterCheckBoxes[i])
        console.log(waterCheckBoxes[i])
        console.log("water array: " + waterArray)
      }
    } else if(waterMonthday !== "Select a date"){
      console.log(waterMonthday)
        waterArray = [water, parseInt(waterMonthday)]
    } else{
      alert("Select your water day.")
    }
    if(waterArray.length >= 2){
      var newPlant = new Plant (commonName, sunlight, hardiness, waterArray, prune, fertilizing)
      console.log(newPlant)
      console.log("water dates" + newPlant.makeSchedule(newPlant.water))
      // console.log("prune dates" + newPlant.makeSchedule(newPlant.pruning))
    } else{
      console.log("in the else for the water check if")
    }
    console.log(newPlant)

  })

  document.getElementById("waterSelection").onchange = function(){
    var elementId = "waterSelection"
    showHideMonthWeek(elementId)
  };

  document.getElementById("pruningSelection").onchange = function(){
    var elementId = "pruningSelection"
    showHideMonthWeek(elementId)
  };

  document.getElementById("fertilizingSelection").onchange = function(){
    var elementId = "fertilizingSelection"
    showHideMonthWeek(elementId)
  };

  document.getElementById("selectPlant").onchange = function(){
    var plantName = $("#selectPlant :selected").text()
    console.log(plantName)
    for(plant = 0; plant < allPlantTemplates.length; ++plant){
      if(plantName === allPlantTemplates[plant].commonName){
        //get values for selected plant
        var sunlight = allPlantTemplates[plant].sunlight
        var hardiness = allPlantTemplates[plant].hardiness
        var waterFrequency = allPlantTemplates[plant].water[0]
        var pruningFrequency = allPlantTemplates[plant].pruning[0]
        var fertilizingFrequency = allPlantTemplates[plant].fertilizing[0]
        //update option shown in dropdown menus
        updatePlantDetails("sunlightSelection", sunlight)
        updatePlantDetails("hardinessSelection", hardiness)
        updatePlantDetails("waterSelection", waterFrequency)
        updatePlantDetails("pruningSelection", pruningFrequency)
        updatePlantDetails("fertilizingSelection", fertilizingFrequency)
       // show or hide month or week selection divs
       showHideMonthWeek("waterSelection");
       showHideMonthWeek("pruningSelection");
       showHideMonthWeek("fertilizingSelection");
       $("#commonNameDiv").hide()
     } else if (plantName === "Create your own") {
        $("#commonNameDiv").show()
        document.getElementById("plantEntryForm").reset();
        $("#selectPlant").val("Create your own");
        showHideMonthWeek("waterSelection");
        showHideMonthWeek("pruningSelection");
        showHideMonthWeek("fertilizingSelection");
      }
    }
  };






  $("#refreshButton").click(function(event){
    console.log("button")
    event.preventDefault();
    var everyPlant = testPlants.concat(allUserPlants);
    console.log(everyPlant)
    var allEvents = makeCalendar(everyPlant);
    sortIntoWeeksAndFormat(allEvents);
    console.log(allEvents)
    // testArrayDates.forEach(function(date){
    //   var dayOfWeekString = weekdayArray[date.getDay()]
    //   var monthString = monthArray[date.getMonth()]
    //   var dateOfMonth = date.getDate()
    //   var year = date.getFullYear()


    //   var formattedDate = dayOfWeekString + ", " + monthString + " " + dateOfMonth + ", " + year
    //   $("p").append("<div class='form-check'>" +
    //                     "<input class='form-check-input' type='checkbox' id='defaultCheck1'>" +
    //                     "<label class='form-check-label' for='defaultCheck1'>" +
    //                       "Value from other team" +
    //                     "</label>" +
    //                   "</div>")
    // });
  });
});

function showHideMonthWeek(elementId){
  var monthSelection = $("#" + elementId + " :selected").text()
  if (monthSelection === "Once a month") {
    $("#" + elementId + "Weekday").hide();
    $("#" + elementId + "Month").show();
  } else if (monthSelection.search("week") > -1) {
    var limit= parseInt($("#" + elementId + " :selected").val())
    var newVar = ("document.forms.plantEntryForm."+ elementId+"CheckBoxes")
    console.log(newVar)
    checkboxlimit(eval(newVar), limit)
    $("#" + elementId + "Month").hide();
    $("#" + elementId + "Weekday").show();
  } else {
    $("#" + elementId + "Month").hide();
    $("#" + elementId + "Weekday").hide();
  }
}

// Template Plants




// spider.makeSchedule(spider.water)

// Test Plants

var spider = new Plant ("Spider Plant", "Part Sun", "Very Tolerant", ["Every other week"], ["Once a month"], ["Every other week"])
allPlantTemplates.push(spider)
var snake = new Plant ("Snake Plant", "Indirect Sun", "Very Tolerant", ["Once a month"], ["Once a month"], ["Once a month"])
allPlantTemplates.push(snake)
var maple = new Plant ("Japanese Maple", "Part Sun", "Temperamental", ["Twice a week"], ["Once a month"], ["onchange"])
allPlantTemplates.push(maple)
var xmascactus = new Plant ("Christmas Cactus", "Shade", "Average", ["Once a week"], ["Once a month"], ["Every other week"])
allPlantTemplates.push(xmascactus)
var aralia = new Plant ("Japanese Aralia", "Shade", "Average", ["Once a week"], ["Once a month"], ["Once a month"])
allPlantTemplates.push(aralia)
var peacelily = new Plant ("Peace Lily", "Indirect Sun", "Very Tolerant", ["Twice a week"], ["Once a month"], ["Every other week"])
allPlantTemplates.push(peacelily)
var asparagus = new Plant ("Asparagus Fern", "Part Sun", "Temperamental", ["Once a week"], ["Once a month"], ["Once a month"])
allPlantTemplates.push(asparagus)
var dracena = new Plant ("Dracena", "Indirect Sun", "Very Tolerant", ["Every other week"], ["Once a month"], ["Every other week"])
allPlantTemplates.push(dracena)

var testPlants = []
var spider2 = new Plant ("Spider Plant", "Part Sun", "Very Tolerant", ["Every other week", "Thursday"], ["Once a month", 6], ["Every other week", "Monday"])
var snake2 = new Plant ("Snake Plant", "Indirect Sun", "Very Tolerant", ["Once a month", 22], ["Once a month", 14], ["Once a month", 2])
var maple2 = new Plant ("Japanese Maple", "Part Sun", "Temperamental", ["Twice a week", "Wednesday", "Thursday"], ["Once a month", 2], ["Once a month", 2])
var aralia2 = new Plant ("Japanese Aralia", "Shade", "Average", ["Once a week", "Saturday"], ["Once a month", 17], ["Once a month", 19])
var xmascactus2 = new Plant ("Christmas Cactus", "Shade", "Average", ["Once a week", "Thursday"], ["Once a month", 13], ["Every other week", "Friday"])
var peacelily2 = new Plant ("Peace Lily", "Indirect Sun", "Very Tolerant", ["Twice a week", "Sunday", "Friday"], ["Once a month", 1], ["Every other week", "Monday"])
var asparagus2 = new Plant ("Asparagus Fern", "Part Sun", "Temperamental", ["Once a week", "Tuesday"], ["Once a month", 16], ["Once a month", 6])
var dracena2 = new Plant ("Dracena", "Indirect Sun", "Very Tolerant", ["Every other week", "Wednesday"], ["Once a month", 14], ["Every other week", "Thursday"])
testPlants.push(spider2)
testPlants.push(snake2)
testPlants.push(maple2)
testPlants.push(aralia2)
testPlants.push(xmascactus2)
testPlants.push(peacelily2)
testPlants.push(asparagus2)
testPlants.push(dracena2)
