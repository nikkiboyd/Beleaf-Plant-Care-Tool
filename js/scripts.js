
var today = new Date()

// use this with index of


Plant.prototype.makeSchedule = function(taskKey) {
  var finalDays = []
  var ddToday = today.getDate()
  var daysLater = 28
  var fourWeeksLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysLater)
  var weekdayArray=["sunday", "monday","tuesday","wednesday","thursday","friday","saturday"]
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





//pair one
var allPlantTemplates = []

//user logic
$(function(){

  $("#plantEntryForm").submit(function(event){
    event.preventDefault();
    var nickName = $("#nickNameInput").val()
    var commonName = $("#commonNameInput").val()
    var sunlight = $("#sunlightSelection :selected").text()
    var hardiness = $("#hardinessSelection :selected").text()
    var water =  $("#waterSelection :selected").text()
    // var waterWeekday = $("#waterSelectionWeekday :checked").val()
    // console.log(waterWeekday)
    var waterCheckBoxes = []
    $("input:checkbox[name=waterDayCheckBoxes]:checked").each(function(){
      waterCheckBoxes.push($(this).val());
    })
    console.log(water, waterCheckBoxes)
    var waterArray =[]
    var waterMonthday = $("#waterMonthDropdown :selected").text()
    var prune = $("#pruningSelection :selected").text()
    var pruneWeekday = $("#pruningSelectionWeekday :checked").val()
    var pruneMonthday = $("#pruneMonthDropdown :selected").text()
    var fertilizing = $("#fertilizingSelection :selected").text()
    var fertilizeWeekday = $("#fertilizingSelectionWeekday :checked").val()
    var fertilizeMonthday = $("#fertilizingMonthDropdown :selected").text()




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
    // if(typeof waterWeekday !== "undefined"){
    //   console.log("waterWeekday")
    //   water = [water, waterWeekday]
    // } else if(waterMonthday !== "Select a date"){
    //   console.log(waterMonthday)
    //     water = [water, parseInt(waterMonthday)]
    // } else{
    //   alert("Select your water day.")
    // }

    // prunig array
    // if(typeof pruneWeekday !== "undefined"){
    //   console.log(pruneWeekday)
    //   prune = [prune, pruneWeekday]
    //   console.log(prune)
    // } else if(pruneMonthday !== "Select a date"){
    //   console.log(pruneMonthday)
    //     prune = [prune, parseInt(pruneMonthday)]
    //     console.log(prune)
    // } else {
    //     alert("Select your prune day.")
    // }

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
});
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


//business logic
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
// console.log(testWeeklyPlantWater.makeSchedule(testWeeklyPlantWater.water))

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

// //test user input
// var spidey = new Plant ("spider", "full", ["weekly"])
// spidey.nickname = "spidey"
// spidey.location = "next to window"


var testMonthlyPlantPruning = new Plant("commonName", "sunlight", "hardiness", ["Weekly", "saturday"], ["Once a month", 14], ["Every other week"])
// console.log(testMonthlyPlantPruning.makeSchedule(testMonthlyPlantPruning.pruning));

var testEOWPlantFert = new Plant("commonName", "sunlight", "hardiness", ["Weekly", "saturday"], ["Once a month", 14], ["Every other week", "monday"])
// console.log(testEOWPlantFert.makeSchedule(testEOWPlantFert.fertilizing));
 // pruning, rotating, misting, fertilizing, location
