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
    var dayOfWeek = new Date(new Date().setHours(0,0,0,0))
    while(firstDay.getDay() !== weekdayArray.indexOf(taskKey[1])){
      firstDay.setDate(firstDay.getDate() + 1)
    }
    finalDays.push(firstDay)
    finalDays.push(new Date(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 7).setHours(0,0,0,0)))
    finalDays.push(new Date(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 14).setHours(0,0,0,0)))
    finalDays.push(new Date(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 21).setHours(0,0,0,0)))
    return finalDays
  } else if (taskKey[0] === "Every other week"){
    var firstDay = new Date(new Date().setHours(0,0,0,0))
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
    var firstDay = new Date(new Date().setHours(0,0,0,0))
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

  $("#week-glance-tasks").text("")
  $("#week-one-tasks").text("")
  $("#week-two-tasks").text("")
  $("#week-three-tasks").text("")
  $("#week-four-tasks").text("")

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
                              "Else: " + allEvents[i][2] + " " + allEvents[i][1] + " on " + allEvents[i][0] +
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
                                weekOneEvents[n][2] + " " + weekOneEvents[n][1] + " the " + weekOneEvents[n][3] +
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
                                weekTwoEvents[p][2] + " " + weekTwoEvents[p][1] + " the " + weekTwoEvents[p][3] +
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
                                weekThreeEvents[y][2] + " " + weekThreeEvents[y][1] + " the " + weekThreeEvents[y][3] +
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
                                weekFourEvents[b][2] + " " + weekFourEvents[b][1] + " the " + weekFourEvents[b][3] +
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
                                glanceEvents[j][2] + " " + glanceEvents[j][1] + " the " + glanceEvents[j][3] +
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
      singleWaterEvent.push(waterDays[i], plant.nickName, "Water", plant.commonName);
      allEvents.push(singleWaterEvent)
    }
    var pruningDays = plant.makeSchedule(plant.pruning)
    for (x = 0; x < pruningDays.length; x++) {
      var singlePruneEvent = [];
      singlePruneEvent.push(pruningDays[x], plant.nickName, "Prune", plant.commonName);
      allEvents.push(singlePruneEvent)
    }
    var fertilizingDays = plant.makeSchedule(plant.fertilizing)
    for (y = 0; y < fertilizingDays.length; y++) {
      var singleFertilizeEvent = [];
      singleFertilizeEvent.push(fertilizingDays[y], plant.nickName, "Fertilize", plant.commonName);
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
      alert("You can only select a maximum of "+limit+" checkboxes.")
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
  } else if (commonName !== "Select a plant to begin" && commonName !== "Create your own"){
      validatedCommonName = commonName
  } else{
    alert("What kind of plant is this?")
    validatedCommonName = ""
  }
  return validatedCommonName
}//END OF validateCommonName

function validateNickName(nickName){
  var validatedNickName
  //validate nickname
  if(nickName !== ""){
    // if this is the first entry then just validate the nickname, otherwise check to see if name is taken
    if(allUserPlants.length > 0){
    //check if name is taken already
      for(i=0; i < allUserPlants.length; ++i){
        if(nickName === allUserPlants[i].nickName){
          alert("Please pick another name. " + nickName + " is already taken.")
          validatedNickName = ""
        } else{
          validatedNickName = nickName
          break
        }
      }
    } else {
      validatedNickName = nickName
    }
  } else {
    alert("Please enter a nickname for your plant")
    validatedNickName = ""
  }
  return validatedNickName
}//END OF validateNickName

//user logic


function getTemplatePlantDetails(){
  // var nickname = $("#nickNameInput").val()
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
    }
  }
} //END getTemplatePlantDetails

function isOptionAlreadySelected(elementId){
  var water =  $("#" + elementId + " :selected").text()
  if(water !== "Select a value"){
    showHideMonthWeek(elementId)
  }
}

function hasDropdownOptionBeenSelected(value){
  if(value === "Select a value"){
    return false
  } else {
    return true
  }
}

function resetDropdown(dropdownId){
  document.getElementById(dropdownId).selectedIndex = 0
}

function validateTaskInputs(taskFrequency, taskDayCheckboxes, taskMonthSelection){
  validatedArray = []
  if(taskDayCheckboxes.length > 0){
    validatedArray.push(taskFrequency)
    for(i=0; i < taskDayCheckboxes.length; ++i){
      validatedArray.push(taskDayCheckboxes[i])
    }
    return validatedArray
  } else if(taskMonthSelection !== "Select a date"){
    validatedArray = [] = [taskFrequency, parseInt(taskMonthSelection)]
    return validatedArray
  }
  // else{
  //   alert("Select a day.")
  // }
} //END validateTaskInputs

//user logic

// homepage
//

$(function(){
  //Hide Plant detail divs
  $(".homepage").show();
  $("#plantEntryStepTwo").hide()
  $(".waterDiv").hide()
  $(".pruningDiv").hide()
  $(".fertilizingDiv").hide()
  $(".container").hide();

  $(".linkhomepage").click(function(event){
    event.preventDefault();
    $(".homepage").show();
    $(".container").hide();
  });

  $(".myplantslink").click(function(event){
    event.preventDefault();
    $("#myGarden").empty();
    var everyPlant = testPlants.concat(allUserPlants);
    appendToGarden(everyPlant)
    $(".homepage").hide();
    $(".container").show();
    $("#calendar-display").hide();
    $("#plantEntryForm").hide();
    $("#myPlants-display").show();
    $("#helppage").hide();


  });
  $(".schedulelink").click(function(event){
    event.preventDefault();
    $(".homepage").hide();
    $(".container").show();
    $("#calendar-display").show();
    $("#plantEntryForm").hide();
    $("#myPlants-display").hide();
    $("#helppage").hide();
    var everyPlant = testPlants.concat(allUserPlants);
    var allEvents = makeCalendar(everyPlant);
    sortIntoWeeksAndFormat(allEvents);

  });
  $(".addplantlink").click(function(event){
    event.preventDefault();
    $(".homepage").hide();
    $(".container").show();
    $("#calendar-display").hide();
    $("#plantEntryForm").show()
    $("#myPlants-display").hide();
    $("#helppage").hide();
  });
  $(".helplink").click(function(event){
    event.preventDefault();
    $(".homepage").hide();
    $(".container").show();
    $("#calendar-display").hide();
    $("#plantEntryForm").hide();
    $("#myPlants-display").hide();
    $("#helppage").show();
  });

  //STEP ONE - Name plant and select its type
  $("#createPlant").click(function(event){
    event.preventDefault()
    var nickName = $("#nickNameInput").val()
    var commonName = $("#selectPlant").val()
    var customCommonName = $("#customCommonName").val()
    var validatedNickName =validateNickName(nickName)
    if(validatedNickName !== ""){
      var validatedCommonName = validateCommonName(commonName, customCommonName);
      if(validatedCommonName !== ""){
       $("#plantEntryStepTwo").show()
       $("#detailsHeader").show()
       $(".plantName").text(nickName + " the " + validatedCommonName)
       getTemplatePlantDetails()
       $("#nickNameInput").prop("readonly", true)
       $("#selectPlant").attr("disabled", true)
       $("#customCommonName").prop("readonly", true)
       $("#createPlant").hide()
       $("#resetCreatePlant").show()

     }
    }
  });
    document.getElementById("selectPlant").onchange = function(){
    var plantName = $("#selectPlant :selected").text()
    if (plantName !== "Create your own") {
        $("#commonNameDiv").hide()
      } else {
        $("#commonNameDiv").show()
      }
    }

  // STEP TWO -Select & validate sunlight and hardiness, show water div
  $("#sunNext").click(function(){
    var sunlight = $("#sunlightSelection :selected").text()
    var hardiness = $("#hardinessSelection :selected").text()
    if(hasDropdownOptionBeenSelected(sunlight)){
      if(hasDropdownOptionBeenSelected(hardiness)){
        $("#sunNext").hide()
        $("#sunReset").show()
        $(".waterDiv").show()
        $("#plantEntryStepTwo").removeClass("bottomBorder");
        $(".waterDiv").addClass("bottomBorder");
        isOptionAlreadySelected("waterSelection")
        $("#sunlightSelection").attr("disabled", true)
        $("#hardinessSelection").attr("disabled", true)
      } else{
        alert("Please select hardiness level")
      }
    } else {
      alert("Please select sunlight needs")
    }
  })

    //STEP THREE - Water div, show pruning
  $("#waterNext").click(function(){
    var water = $("#waterSelection :selected").text()
    var waterMonthday = $("#waterMonthDropdown :selected").text()
    var waterCheckBoxes = []
    $("input:checkbox[name=waterSelectionCheckBoxes]:checked").each(function(){
      waterCheckBoxes.push($(this).val());
    })
    // $("input:checkbox[name=waterSelectionCheckBoxes]:checked").each(function(){
    //   waterCheckBoxes.push($(this).val());
    // })
    if(hasDropdownOptionBeenSelected(water)){
      if(waterCheckBoxes.length > 0 || waterMonthday !== "Select a date"){
        $("#waterNext").hide()
        $("#waterReset").show()
        $(".pruningDiv").show()
        $(".waterDiv").removeClass("bottomBorder");
        $(".pruningDiv").addClass("bottomBorder");
        isOptionAlreadySelected("pruningSelection")
        $("#waterSelection").attr("disabled", true)
        $("#waterMonthDropdown").attr("disabled", true)
        $("#waterSelectionWeekday input").attr("disabled", true)
      } else {
        alert("Please select when you will water")
      }
    } else {
      alert("Please select how often to water")
    }
  })

  //STEP FOUR -Pruning div, show fertilizing div
  $("#pruningNext").click(function(){
    var prune = $("#pruningSelection :selected").text()
    var pruneMonthday = $("#pruneMonthDropdown :selected").text()
    var pruneCheckBoxes = []
    $("input:checkbox[name=pruningSelectionCheckBoxes]:checked").each(function(){
      pruneCheckBoxes.push($(this).val());
    })
    if(hasDropdownOptionBeenSelected(prune)){
      if(pruneCheckBoxes.length > 0 || pruneMonthday !== "Select a date"){
        $("#pruningNext").hide()
        $("#pruningReset").show()
        $(".fertilizingDiv").show()
        $(".pruningDiv").removeClass("bottomBorder");
        $(".fertilizingDiv").addClass("bottomBorder");
        isOptionAlreadySelected("fertilizingSelection")
        $("#pruningSelection").attr("disabled", true)
        $("#pruneMonthDropdown").attr("disabled", true)
        $("#pruningSelectionWeekday input").attr("disabled", true)
      } else {
        alert("Please select when you will prune")
      }
    } else {
      alert("Please select how often to prune")
    }
  })

  // RESET BUTTONS
  $("#resetCreatePlant").click(function(){
    // reset values
    resetDropdown("selectPlant")
    $("#nickNameInput").val("")
    $("#nickNameInput").val("")
    //swap buttons
    $("#resetCreatePlant").hide()
    $("#createPlant").show()
     $("#commonNameDiv").hide()
    //enable all fields, dropdowns
    $("#selectPlant").attr("disabled", false)
    $("#nickNameInput").prop("readonly", false)
    $("#customCommonName").prop("readonly", false)
  })

  $("#sunReset").click(function(){
    resetDropdown("sunlightSelection")
    resetDropdown("hardinessSelection")
    $("#sunlightSelection").attr("disabled", false)
    $("#hardinessSelection").attr("disabled", false)
    $("#sunReset").hide()
    $("#sunNext").show()
  })

  $("#waterReset").click(function(){
    resetDropdown("waterSelection")
    resetDropdown("waterMonthDropdown")
    $("#waterSelectionWeekday input").prop("checked", false);
    $("#waterSelection").attr("disabled", false)
    $("#waterSelectionWeekday input").attr("disabled", false)
    $("#waterMonthDropdown").attr("disabled", false)
    $("#waterReset").hide()
    $("#waterNext").show()
  })

  $("#pruningReset").click(function(){
    resetDropdown("pruningSelection")
    resetDropdown("pruneMonthDropdown")
    $("#pruningSelectionWeekday input").prop("checked", false);
    $("#pruningSelection").attr("disabled", false)
    $("#pruningSelectionWeekday input").attr("disabled", false)
    $("#pruneMonthDropdown").attr("disabled", false)
    $("#pruningReset").hide()
    $("#pruningNext").show()
  })

  $("#plantEntryForm").submit(function(event){
    event.preventDefault();
    var nickName = $("#nickNameInput").val()
    var validatedNickName = validateNickName(nickName)
    var commonName = $("#selectPlant").val()
    var customCommonName = $("#customCommonName").val()
    var validatedCommonName = validateCommonName(commonName, customCommonName)
    var sunlight = $("#sunlightSelection :selected").text()
    var hardiness = $("#hardinessSelection :selected").text()
    //water variables
    var water =  $("#waterSelection :selected").text()
    var waterCheckBoxes = []
    $("input:checkbox[name=waterSelectionCheckBoxes]:checked").each(function(){
      waterCheckBoxes.push($(this).val());
    })
    var waterMonthday = $("#waterMonthDropdown :selected").text()
    var waterArray = validateTaskInputs(water, waterCheckBoxes, waterMonthday)
    // pruning variables
    var prune = $("#pruningSelection :selected").text()
    var pruneCheckBoxes = []
    $("input:checkbox[name=pruningSelectionCheckBoxes]:checked").each(function(){
      pruneCheckBoxes.push($(this).val());
    })
    var pruneWeekday = $("#pruningSelectionWeekday :checked").val()
    var pruneMonthday = $("#pruneMonthDropdown :selected").text()
    var pruningArray = validateTaskInputs(prune, pruneCheckBoxes, pruneMonthday)
    // fertilizing variables
    var fertilizing = $("#fertilizingSelection :selected").text()
    var fertilizingCheckBoxes = []
    $("input:checkbox[name=fertilizingSelectionCheckBoxes]:checked").each(function(){
      fertilizingCheckBoxes.push($(this).val());
    })
    var fertilizeWeekday = $("#fertilizingSelectionWeekday :checked").val()
    var fertilizeMonthday = $("#fertilizingMonthDropdown :selected").text()
    var fertilizingArray = validateTaskInputs(fertilizing, fertilizingCheckBoxes, fertilizeMonthday)
    if(hasDropdownOptionBeenSelected(fertilizing)){
      if(fertilizingCheckBoxes.length > 0 || fertilizeMonthday !== "Select a date"){
        //create new plant
        var newPlant = new Plant (validatedCommonName, sunlight, hardiness, waterArray, pruningArray, fertilizingArray)
        Plant.prototype.addUsersDetails(newPlant, validatedNickName)
        allUserPlants.push(newPlant);
        document.getElementById("plantEntryForm").reset();
        $("#plantEntryStepTwo").hide()
        $(".waterDiv").hide()
        $(".pruningDiv").hide()
        $(".fertilizingDiv").hide()
        $("#resetCreatePlant").hide()
        $("#createPlant").show()
        $("#plantEntryForm input").attr("disabled", false)
        $("#plantEntryForm select").attr("disabled", false)
        $("#nickNameInput").prop("readonly", false)
        $("#customCommonName").prop("readonly", false)
        $(".nextButtons").show()
        $(".resetButtons").hide()
        $("#plantEntryStepTwo").hide()
        $("#detailMsg").hide()
        $("#confirmMsg").show()
      } else {
        alert("Please select when you will fertilize.")
      }
    } else {
      alert("Please select how often to fertilize.")
    }
  }) //END SUBMIT CLICK EVENT

  // document.getElementById("selectPlant").onchange = function(){
  //   var selectedPlant = $("#selectPlant").val()
  //   if(selectdPlant !== "Creat your own"){
  //     $("#commonNameDiv").hide();
  //   }
  //
  // };

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
});

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
} // NOT USING THE ABOVE FUNCTION

function showHideMonthWeek(elementId){
  var selection = $("#" + elementId + " :selected").text()
  if (selection === "Once a month") {
    $("#" + elementId + "Weekday").hide();
    $("#" + elementId + "WeekdayLabel").hide();
    $("#" + elementId + "Month").show();
  } else if (selection.search("week") > -1) {
    var limit= parseInt($("#" + elementId + " :selected").val())
    var newVar = ("document.forms.plantEntryForm."+ elementId+"CheckBoxes")
    checkboxlimit(eval(newVar), limit)
    $("#" + elementId + "Month").hide();
    $("#" + elementId + "Weekday").show();
    $("#" + elementId + "WeekdayLabel").show();
  } else {
    $("#" + elementId + "Month").hide();
    $("#" + elementId + "Weekday").hide();
    $("#" + elementId + "WeekdayLabel").hide();
  }
}

function appendToGarden(everyPlant) {
  everyPlant.forEach(function(plant){
    $("#myGarden").append("<div class ='newPlant col-md-3'>" + "<h2 id=" + plant.nickName + ">" + plant.nickName + "</h2>" + "<h3 id=" + plant.commonName + ">" + plant.commonName + "</h3>" + "<img src='img/" + plant.commonName + ".jpg'>" +"</div>")
  })
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

Plant.prototype.addUsersDetails(spider2, "Spidey")
Plant.prototype.addUsersDetails(snake2, "Slytherin")
Plant.prototype.addUsersDetails(maple2, "Syrup")
Plant.prototype.addUsersDetails(aralia2, "Arya")
Plant.prototype.addUsersDetails(xmascactus2, "Christmas")
Plant.prototype.addUsersDetails(peacelily2, "Dove")
Plant.prototype.addUsersDetails(asparagus2, "Sparry")
Plant.prototype.addUsersDetails(dracena2, "Draco")
testPlants.push(spider2)
testPlants.push(snake2)
testPlants.push(maple2)
testPlants.push(aralia2)
testPlants.push(xmascactus2)
testPlants.push(peacelily2)
testPlants.push(asparagus2)
testPlants.push(dracena2)
