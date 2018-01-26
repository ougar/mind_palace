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
var TrainType = "";            // Train card or numbers
var TrainGroup = [0,1,2,3,4];  // Choose numbers/cards from which groups
var TrainDepth = 1;            // Choose 1 number or 3 to make full "mix"

// Values to create links to playing cards
var Suits = ["hearts","clubs","diamonds","spades"];
var Face  = ["ace",2,3,4,5,6,7,8,9,10,"jack","queen","king"];

$(document).ready(function(){
  fetchMindData();
});

function fetchMindData() {
  var request = new XMLHttpRequest();
  var url = "http://ougar.dk/mind_palace/minddata.php";
  request.open('GET', url);
  request.responseType = 'json';
  request.onload = function() {
    MindData = request.response;
    document.getElementById('content').onclick=clickBody;
  };
  request.send();
}

function clickBody() {
  if   (State == "ready") newTest();
  else reveal();
}

function reveal() {
  $("span").show();
  State="ready";
}

function newTest() {
  State="test";
  // Hide answer
  $("span").hide();
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

