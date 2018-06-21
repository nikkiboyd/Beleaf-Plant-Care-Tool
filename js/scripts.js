//business logic
var today = new Date(new Date().setHours(0,0,0,0))
var weekdayArray=["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
var monthArray = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"]
var allPlantTemplates = []
var allUserPlants = []

Plant.prototype.makeSchedule = function(taskKey) {
  var finalDays = []
  var ddToday = today.getDate()
  var daysLater = 40
  var fourWeeksLater = new Date(new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysLater).setHours(0,0,0,0))

  if (taskKey[0] === "Once a week") {
    var firstDay = new Date(new Date().setHours(0,0,0,0))
    var dayOfWeek = firstDay.getDay()
    while(firstDay.getDay() !== weekdayArray.indexOf(taskKey[1])){
      firstDay.setDate(firstDay.getDate() + 1)
    }
    finalDays.push(firstDay)
    finalDays.push(new Date(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 7).setHours(0,0,0,0)))
    finalDays.push(new Date(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 14).setHours(0,0,0,0)))
    finalDays.push(new Date(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 21).setHours(0,0,0,0)))
    return finalDays
  } else if (taskKey[0] === "Every other week"){
    var firstDay = new Date()
    var dayOfWeek = firstDay.getDay()
    while(firstDay.getDay() !== weekdayArray.indexOf(taskKey[1])){
      firstDay.setDate(firstDay.getDate() + 1)
    }
    finalDays.push(firstDay)
    finalDays.push(new Date(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 14).setHours(0,0,0,0)))
    return finalDays
  } else if (taskKey[0] === "Twice a week"){
    var firstDay = new Date(new Date().setHours(0,0,0,0))
    var secondDay = new Date(new Date().setHours(0,0,0,0))
    var twoDays = [taskKey[1], taskKey[2]];
    while(firstDay.getDay() !== weekdayArray.indexOf(taskKey[1])){
      firstDay.setDate(firstDay.getDate() + 1)
    }
    finalDays.push(firstDay)
    finalDays.push(new Date(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 7).setHours(0,0,0,0)))
    finalDays.push(new Date(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 14).setHours(0,0,0,0)))
    finalDays.push(new Date(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 21).setHours(0,0,0,0)))
    while(secondDay.getDay() !== weekdayArray.indexOf(taskKey[2])){
      secondDay.setDate(secondDay.getDate() + 1)
    }
    finalDays.push(secondDay)
    finalDays.push(new Date(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 7).setHours(0,0,0,0)))
    finalDays.push(new Date(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 14).setHours(0,0,0,0)))
    finalDays.push(new Date(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 21).setHours(0,0,0,0)))
    return finalDays
  } else if (taskKey[0] === "Once a month") {
    var firstDay = new Date()
    while(firstDay < fourWeeksLater) {
      if (firstDay.getDate() === taskKey[1]) {
      finalDays.push(firstDay)
      return finalDays
    } else {
        firstDay = new Date(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 1).setHours(0,0,0,0))
      }
    }
  }
}

function formatDate(dateObj) {
  var dayOfWeekString = weekdayArray[dateObj.getDay()]
  var monthString = monthArray[dateObj.getMonth()]
  var dateOfMonth = dateObj.getDate()
  var year = dateObj.getFullYear()
  var formattedDate = dayOfWeekString + ", " + monthString + " " + dateOfMonth
  return formattedDate
}

function Plant(commonName, sunlight, hardiness, water, pruning, fertilizing){
  this.commonName = commonName
  this.sunlight = sunlight
  this.hardiness = hardiness
  this.water = water
  this.pruning = pruning
  this.fertilizing = fertilizing
  this.nickName
}


function compareFirstElementDatesFunc(a, b){
  return (a[0] - b[0]);
}

function makeUniqueWeekDays(weekEvents) {
    var uniqueDays = [] // an array listing each unique weekday in week One
    weekEvents.forEach(function(day){
      weekdayVal = day[0].getDay() // a number
      if (!uniqueDays.includes(weekdayArray[weekdayVal])) {
        uniqueDays.push(weekdayArray[weekdayVal])
      }
    })
    return(uniqueDays)
}

function sortIntoWeeksAndFormat(allEvents) {

  var weekOneRange = [today, (new Date(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6).setHours(0,0,0,0)))];
  var weekTwoRange = [(new Date(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7).setHours(0,0,0,0))), (new Date(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 13).setHours(0,0,0,0)))]
  var weekThreeRange = [(new Date(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14).setHours(0,0,0,0))), (new Date(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 20).setHours(0,0,0,0)))]
  var weekFourRange = [(new Date(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 21).setHours(0,0,0,0))), (new Date(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 27).setHours(0,0,0,0)))]
  var glanceRange = [(new Date(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 28).setHours(0,0,0,0))), (new Date(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 40).setHours(0,0,0,0)))]

  allEvents.sort(compareFirstElementDatesFunc);

  var weekOneEvents = []
  var weekTwoEvents = []
  var weekThreeEvents = []
  var weekFourEvents = []
  var glanceEvents = []

  $("#week-one-range").text(" " + (weekOneRange[0].getMonth() + 1) + "/" + weekOneRange[0].getDate() + " - " + (weekOneRange[1].getMonth() + 1) + "/" + weekOneRange[1].getDate())

  $("#week-two-range").text(" " + (weekTwoRange[0].getMonth() + 1) + "/" + weekTwoRange[0].getDate() + " - " + (weekTwoRange[1].getMonth() + 1) + "/" + weekTwoRange[1].getDate())

  $("#week-three-range").text(" " + (weekThreeRange[0].getMonth() + 1) + "/" + weekThreeRange[0].getDate() + " - " + (weekThreeRange[1].getMonth() + 1) + "/" + weekThreeRange[1].getDate())

  $("#week-four-range").text(" " + (weekFourRange[0].getMonth() + 1) + "/" + weekFourRange[0].getDate() + " - " + (weekFourRange[1].getMonth() + 1) + "/" + weekFourRange[1].getDate())

  $("#glance-range").text(" " + (glanceRange[0].getMonth() + 1) + "/" + glanceRange[0].getDate() + " - " + (glanceRange[1].getMonth() + 1) + "/" + glanceRange[1].getDate())

  for(i = 0; i < allEvents.length; i++) {

    if (allEvents[i][0] >= weekOneRange[0] && allEvents[i][0] <= weekOneRange[1]) {
      weekOneEvents.push(allEvents[i])
    } else if (allEvents[i][0] >= weekTwoRange[0] && allEvents[i][0] <= weekTwoRange[1]) {
      weekTwoEvents.push(allEvents[i])
    } else if (allEvents[i][0] >= weekThreeRange[0] && allEvents[i][0] <= weekThreeRange[1]) {
      weekThreeEvents.push(allEvents[i])
    } else if (allEvents[i][0] >= weekFourRange[0] && allEvents[i][0] <= weekFourRange[1]) {
      weekFourEvents.push(allEvents[i])
    } else if (allEvents[i][0] >= glanceRange[0] && allEvents[i][0] <= glanceRange[1]) {
      glanceEvents.push(allEvents[i])
    } else {
      $("#week-glance-tasks").append("<div class='form-check'>" +
                              "<label class='form-check-label'>" +
                              "<input class='form-check-input' type='checkbox'>" +
                              "Else: " + allEvents[i][2] + " " + allEvents[i][1] + " on " + formattedDate +
                              "</label>" +
                              "</div>")
    }
  }

  var uniqueDaysWeekOne = makeUniqueWeekDays(weekOneEvents)
  var uniqueDaysWeekTwo = makeUniqueWeekDays(weekTwoEvents)
  var uniqueDaysWeekThree = makeUniqueWeekDays(weekThreeEvents)
  var uniqueDaysWeekFour = makeUniqueWeekDays(weekFourEvents)
  var uniqueDaysWeekGlance = makeUniqueWeekDays(glanceEvents)

  for (m = 0; m < uniqueDaysWeekOne.length; ++m) { // for every unique weekday
    $("#week-one-tasks").append("<h4>" + uniqueDaysWeekOne[m] + "</h4>")
    for (n = 0; n < weekOneEvents.length; ++n) { // for every day in weekOneEvents
      if (uniqueDaysWeekOne[m] === weekdayArray[weekOneEvents[n][0].getDay()]) {
        $("#week-one-tasks").append("<div class='form-check'>" +
                                "<label class='form-check-label'>" +
                                "<input class='form-check-input' type='checkbox'>" +
                                weekOneEvents[n][2] + " " + weekOneEvents[n][1] +
                                "</label>" +
                                "</div>")
      }
    }
  }

  for (o = 0; o < uniqueDaysWeekTwo.length; ++o) {
    $("#week-two-tasks").append("<h4>" + uniqueDaysWeekTwo[o] + "</h4>")
    for (p = 0; p < weekTwoEvents.length; ++p) {
      if (uniqueDaysWeekTwo[o] === weekdayArray[weekTwoEvents[p][0].getDay()]) {
        $("#week-two-tasks").append("<div class='form-check'>" +
                                "<label class='form-check-label'>" +
                                "<input class='form-check-input' type='checkbox'>" +
                                weekTwoEvents[p][2] + " " + weekTwoEvents[p][1] +
                                "</label>" +
                                "</div>")
      }
    }
  }
  for (x = 0; x < uniqueDaysWeekThree.length; ++x) {
    $("#week-three-tasks").append("<h4>" + uniqueDaysWeekThree[x] + "</h4>")
    for (y = 0; y < weekThreeEvents.length; ++y) {
      if (uniqueDaysWeekThree[x] === weekdayArray[weekThreeEvents[y][0].getDay()]) {
        $("#week-three-tasks").append("<div class='form-check'>" +
                                "<label class='form-check-label'>" +
                                "<input class='form-check-input' type='checkbox'>" +
                                weekThreeEvents[y][2] + " " + weekThreeEvents[y][1] +
                                "</label>" +
                                "</div>")
      }
    }
  }
  for (d = 0; d < uniqueDaysWeekFour.length; ++d) {
    $("#week-four-tasks").append("<h4>" + uniqueDaysWeekFour[d] + "</h4>")
    for (b = 0; b < weekFourEvents.length; ++b) {
      if (uniqueDaysWeekFour[d] === weekdayArray[weekFourEvents[b][0].getDay()]) {
        $("#week-four-tasks").append("<div class='form-check'>" +
                                "<label class='form-check-label'>" +
                                "<input class='form-check-input' type='checkbox'>" +
                                weekFourEvents[b][2] + " " + weekFourEvents[b][1] +
                                "</label>" +
                                "</div>")
      }
    }
  }
  for (l = 0; l < uniqueDaysWeekGlance.length; ++l) {
    $("#week-glance-tasks").append("<h4>" + uniqueDaysWeekGlance[l] + "</h4>")
    for (j = 0; j < glanceEvents.length; ++j) {
      if (uniqueDaysWeekGlance[l] === weekdayArray[glanceEvents[j][0].getDay()]) {
        $("#week-glance-tasks").append("<div class='form-check'>" +
                                "<label class='form-check-label'>" +
                                "<input class='form-check-input' type='checkbox'>" +
                                glanceEvents[j][2] + " " + glanceEvents[j][1] +
                                "</label>" +
                                "</div>")
      }
    }
  }
}


function makeCalendar(everyPlant) {
  var allEvents = []
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
  })
  return allEvents;
}

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
//only adds Nickname for now
Plant.prototype.addUsersDetails = function(newPlant, nickName){
  newPlant.nickName = nickName
}

//This is called by click event for Create your plant
function validateCommonName(commonName, customCommonName){
  var validatedCommonName
  if (commonName === "Create your own" && customCommonName !== ""){
    validatedCommonName = customCommonName
    console.log("this is the validated commonName " + validatedCommonName)
  } else if (commonName !== "Select a plant to begin" && commonName !== "Create your own"){
      validatedCommonName = commonName
  } else{
    alert("what kind of plant is this")
  }
  console.log("the validated commonName is " + validatedCommonName)
}//END OF validateCommonName


function validateNickName(nickName){
  var validatedNickName
  //validate nickname
  if(nickName !== ""){
    console.log("in the if statement")
    // if this is the first entry then just validate the nickname, otherwise check to see if name is taken
    if(allUserPlants.length > 0){
    //check if name is taken already
      for(i=0; i < allUserPlants.length; ++i){
        console.log("in the for loop")
        if(nickName === allUserPlants[i].nickName){
          alert("please pick another name")
        } else{
          console.log("this is the current nickName:" + validatedNickName)
          validatedNickName = nickName
          break
        }
      }
    } else(validatedNickName = nickName)
  } else {
    alert("Please enter a nickname for your plant")
  }
  console.log("the validated nickname is " + validatedNickName)
}//END OF validateNickName

//user logic
$(function(){
  //STEP ONE - Name plant and select its type
  $("#createPlant").click(function(event){
    event.preventDefault()
    var nickName = $("#nickNameInput").val()
    var commonName = $("#selectPlant").val()
    var customCommonName = $("#customCommonName").val()
    validateNickName(nickName)
    validateCommonName(commonName, customCommonName)
  });

  // STEP TWO - fill in plant details if a template plant is selected
  document.getElementById("selectPlant").onchange = function(){
    var nickname = $("#nickNameInput").val()
    var plantName = $("#selectPlant :selected").text()
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
        // document.getElementById("plantEntryForm").reset();
        $("#selectPlant").val("Create your own");
        showHideMonthWeek("waterSelection");
        showHideMonthWeek("pruningSelection");
        showHideMonthWeek("fertilizingSelection");
      }
    }
  };//END OF ONCHANGE FOR SELECTPLANT

  $("#plantEntryForm").submit(function(event){
    event.preventDefault();
    var nickName = $("#nickNameInput").val()
    var commonName = $("#selectPlant").val()
    var sunlight = $("#sunlightSelection :selected").text()
    var hardiness = $("#hardinessSelection :selected").text()
    var water =  $("#waterSelection :selected").text()
    var waterCheckBoxes = []
    $("input:checkbox[name=waterSelectionCheckBoxes]:checked").each(function(){
      waterCheckBoxes.push($(this).val());
    })
    console.log("waterCheckBoxes array is: " + waterCheckBoxes)
    var waterArray =[]
    var waterMonthday = $("#waterMonthDropdown :selected").text()
    var prune = $("#pruningSelection :selected").text()
    var pruneWeekday = $("#pruningSelectionWeekday :checked").val()
    var pruneMonthday = $("#pruneMonthDropdown :selected").text()
    var fertilizing = $("#fertilizingSelection :selected").text()
    var fertilizeWeekday = $("#fertilizingSelectionWeekday :checked").val()
    var fertilizeMonthday = $("#fertilizingMonthDropdown :selected").text()

    //NEED TO UPDATE TO MAKE SURE USER HAS SELECTED ALL NECESSARY SELECTIONS FOR ALL FIELDS
    if(waterCheckBoxes.length > 0){
      console.log("water var is: " + water)
      waterArray.push(water)
      for(i=0; i< waterCheckBoxes.length; ++i){
        waterArray.push(waterCheckBoxes[i])
        console.log(waterCheckBoxes[i])
        console.log("water array: " + waterArray)
      }
      var newPlant = new Plant (commonName, sunlight, hardiness, waterArray, prune, fertilizing)
    } else if(waterMonthday !== "Select a date"){
      console.log(waterMonthday)
      waterArray = [water, parseInt(waterMonthday)]
      var newPlant = new Plant (commonName, sunlight, hardiness, waterArray, prune, fertilizing)
    } else{
      alert("Select your water day.")
    }
    // if(waterArray.length >= 2){
    //   var newPlant = new Plant (commonName, sunlight, hardiness, waterArray, prune, fertilizing)
    //   console.log(newPlant)
    //   console.log("water dates" + newPlant.makeSchedule(newPlant.water))
    //   // console.log("prune dates" + newPlant.makeSchedule(newPlant.pruning))
    // } else{
    //   console.log("in the else for the water check if")
    // }
    allUserPlants.push(newPlant);
    Plant.prototype.addUsersDetails(newPlant, nickName)
    console.log(newPlant)

  }) //END SUBMIT CLICK EVENT


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



// NOT USING THIS YET
function checkNickname(nickname, myPlants){
  // check each name in myPlants to make sure it nickname isn't already taken
  for ( i=0; i < myPlants.length; ++i){
    if(nickname === myPlants[i]){
      alert("Please use a different nickname. " + nickname + " is already taken.")
    } else {
      console.log("this is a valid nickname")
    }
  }
}



  $("#refreshButton").click(function(event){
    event.preventDefault();
    var everyPlant = testPlants.concat(allUserPlants);
    var allEvents = makeCalendar(everyPlant);
    sortIntoWeeksAndFormat(allEvents);
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
