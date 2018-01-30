// location = `https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8&q=mdn%20query%20string`
// some = new URLSearchParams(window.location.search)
// some.get('q') // 'mdn query string'
// some.has('ie') // true
// some.append('new','here').toString() // "sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8&q=mdn+query+string&new=here"

// Mind Palace data read via AJAX call
var MindData;
// Data for current randomly selected number
var Data;

// Status: ready: on click make new question and hide pao
//         test:  on click reveal pao association
var State = "ready";
// Options
var TrainType   = "card";       // Train card or numbers
var TrainDepth  = 1;            // Choose 1 number or 3 to make full "mix"
var TrainGroups = [1,1,1,1,1];  // Currently selected number groups
var TrainCards  = [1,1,1,1];    // Currently selected suits
var TrainDir    = "c2i";        // Train direction: image2num or num2image
var TrainPAO    = [1,1,1];      // Show which properties when depth=1

// Values to create links to playing cards
var Suits = ["hearts","clubs","diamonds","spades"];
var Face  = ["","ace",2,3,4,5,6,7,8,9,10,"jack","queen","king"];

$(document).ready(function(){
  fetchMindData();
  // Catch clicks to change options
  $("#traintype").click(toggleTrainType);
  $("#traindepth").click(toggleTrainDepth);
  $("#traindirection").click(toggleTrainDirection);
  // Add the variable holding boolean values for each group element to the click function
  $("#groupcard span").click({group:TrainCards},selectGroup);
  $("#groupnumber span").click({group:TrainGroups},selectGroup);
  $("#trainpao span").click({group:TrainPAO},selectPAO);
  // By default we train cards, so hide number groups
  $("#groupnumber").hide();
  // Preselect all groups and pao options (add "selected" class to all spans)
  $("#groupcard span").addClass("selected");
  $("#groupnumber span").addClass("selected");
  $("#trainpao span").addClass("selected");
});

// When option Card/num is clicked, switch option and
// Switch group select option to number/card
function toggleTrainType() {
  if (TrainType=="card") TrainType="number"; else TrainType="card";
  $("#opt_card").toggleClass("selected");
  $("#opt_number").toggleClass("selected");
  $("#groupnumber").toggle();
  $("#groupcard").toggle();
}

// When training depth is clicked alternate between depth=1 and depth=3
// When depth=3 hide PAO selected, since we always use all 3 when depth=3
function toggleTrainDepth() {
  if (TrainDepth==1) TrainDepth=3; else TrainDepth=1;
  $("#opt_d1").toggleClass("selected");
  $("#opt_d3").toggleClass("selected");
  if (TrainDepth==1) $("#trainpao").css("visibility","visible");
  else               $("#trainpao").css("visibility","hidden");
}

// Toggle between i2c and c2i (image -> card/number or card/number -> image)
function toggleTrainDirection() {
  if (TrainDir=="c2i") TrainDir="i2c"; else TrainDir="c2i";
  $("#traindirection").html(TrainDir);
}

// When an element in number/card/pao group is clicked, toggle active/inactive
// Relevant global variable array of booleans are added as event.data
function selectGroup(event) {
  var group=event.data.group;
  var i=$(this).index();            // Which span was clicked
  $(this).toggleClass("selected");  // Toggle selected class
  group[i]=!group[i];               // Toggle boolean in global group variable
}

function selectPAO(event) {
  var group=event.data.group;
  var i=$(this).index();            // Which span was clicked
  $(this).toggleClass("selected");  // Toggle selected class
  group[i]=!group[i];               // Toggle boolean in global group variable
  // Toggle visibility of relevant element
  var id=(["person","action","object"])[i];
  if (group[i]) $("#"+id).css("visibility","visible");
  else          $("#"+id).css("visibility","hidden");
}

// Fetch json minddata from server. Page can't run until data is fetched
function fetchMindData() {
  var request = new XMLHttpRequest();
  var url = "http://ougar.dk/mind_palace/minddata.php";
  request.open('GET', url);
  request.responseType = 'json';
  request.onload = function() {
    MindData = request.response;
    $("#content").click(clickBody);
  };
  request.send();
}

// When anything (which is not an option) is clicked, we either reveal
// the answer to the current question or create a new question
function clickBody() {
  if   (State == "ready") newTest();
  else reveal();
}

// Reveal simply sets relevant elements to "visible"
function reveal() {
  showTop();
  showPAO();
  State="ready";
}

function findRandomGroup() {
  // Make array with valid groups to choose from
  var valid=[];
  var group=(TrainType=="card"?TrainCards:TrainGroups);
  for (var x=0;x<group.length;x++)
    if (group[x]) valid.push(x);
  // If nothing is selected, treat that as ALL is selected
  if (valid.length==0) {
    if (TrainType=="card") valid=[0,1,2,3];
    else valid=[0,1,2,3,4];
  }
  // Return a random element in the valid array
  return(valid[Math.floor(Math.random()*valid.length)]);
}
function findRandomEntry() {
  if (TrainType=="card") return(Math.floor(Math.random()*13)+1);
  else return(Math.floor(Math.random()*20));
}

function findRandomTest() {
  return(20*findRandomGroup()+findRandomEntry());
}

function hideTop() {
  $("#target").css("visibility", "hidden");
}
function showTop() {
  $("#target").css("visibility", "visible");
}
function hidePAO() {
  $("#memimage span").css("visibility","hidden");
}
function showPAO() {
  if (TrainDepth==3 || TrainPAO[0]) $("#person").css("visibility","visible");
  if (TrainDepth==3 || TrainPAO[1]) $("#action").css("visibility","visible");
  if (TrainDepth==3 || TrainPAO[2]) $("#object").css("visibility","visible");
}

function showTest() {
  console.log("Traindir: "+TrainDir);
  if (TrainDir=="i2c") showPAO();
  else showTop();
}

function num2card(num) {
  var suit=Suits[Math.floor(num/20)];
  var value=Face[num%20];
  return("cards/"+value+"_of_"+suit+".png");
}

function newTest() {
  // Toggle test/answer state
  State="test";
  // Hide answer (Hide card/num if direction=i2c, hide mind image if direction=c2i)
  if (TrainDir=="c2i") hidePAO();
  if (TrainDir=="i2c") hideTop();
  // Get random object or random triplet
  var test;
  if (TrainDepth==1) test=findRandomTest();
  else test=[findRandomTest(),findRandomTest(),findRandomTest()];
  //console.log("New test: "+test);
  // Clear target of any numbers or cards
  $("#target").empty();
  if (TrainDepth==1) {
    Data=MindData[test];
    if (TrainType=="card") $("#target").append("<img src='"+num2card(test)+"'>");
    else                   $("#target").append(test);
    $("#target").removeClass("threenum");
    $("#person").html(Data["person"]);
    $("#action").html(Data["action"]);
    $("#object").html(Data["object"]);
  }
  if (TrainDepth==3) {
    var data=[MindData[test[0]],
              MindData[test[1]],
              MindData[test[2]]]
    // When training with 3 numbers, we need a smaller font
    if (TrainType=="card") $("#target").removeClass("threenum");
    else                   $("#target").addClass("threenum");
    if (TrainType=="card") {
      var i;
      $("#target").append($("<img>").attr("src",num2card(test[0])).addClass("leftcard"));
      $("#target").append($("<img>").attr("src",num2card(test[1])).addClass("centercard"));
      $("#target").append($("<img>").attr("src",num2card(test[2])).addClass("rightcard"));
    }
    else {
      $("#target").append(test[0]+" - "+test[1]+" - "+test[2]);
    }
    $("#person").html(data[0]["person"]);
    $("#action").html(data[1]["action"]);
    $("#object").html(data[2]["object"]);
  }
  showTest();
}
/*
  // Find new card to show
  if (TrainType=="card") {
    n=Math.floor(Math.random()*39);
    index=20*Math.floor(n/13)+(n%13)+1;
    suit=Suits[Math.floor(n/13)];
    face=Face[n%13];
    card=face+"_of_"+suit+".png";
    $("#card").attr("src","cards/"+card);
  }
  // Or find a new number to show
  else {
    n=Math.floor(Math.random()*60);
    // Zero pad numbers below 10
    index=n;
    if (n<10) n="0"+n;
    $("#number").html(n);
  }
  data=MindData[index];
  $("#person").html(data["person"]);
  $("#action").html(data["action"]);
  $("#object").html(data["object"]);
}
*/

function mydebug() {
  console.log($("#target").attr("class").toString().split(' '));
}
