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
