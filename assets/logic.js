//Initialize Firebase
  var config = {
    apiKey: "AIzaSyDaf1SsYVomZvan8Lx3WYHozzF8BIaPIiA",
    authDomain: "trainscheduler-bc710.firebaseapp.com",
    databaseURL: "https://trainscheduler-bc710.firebaseio.com",
    projectId: "trainscheduler-bc710",
    storageBucket: "",
    messagingSenderId: "686174193324"
  };
  firebase.initializeApp(config);

var trainSched = firebase.database();

$("#submit").on("click", function() {
  var train = $("#train").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrainUnix = moment($("#first-train").val().trim(), "hh:mm").subtract(10, "years").format("X");
  var frequency = $("#frequency").val().trim();

  var addTrain = {
    name: train,
    destination: destination,
    firstTrain: firstTrainUnix,
    frequency: frequency
  };
  trainSched.ref().push(addTrain);

  console.log(addTrain.name);
  console.log(addTrain.destination);
  console.log(firstTrainUnix);
  console.log(addTrain.frequency);

  
  alert("Train successfully added");

  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");

  return false;
});

trainSched.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tFrequency = childSnapshot.val().frequency;
  var tFirstTrain = childSnapshot.val().firstTrain;

  var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
  var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency;
  var tMinutes = tFrequency - tRemainder;

  var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

  console.log(tMinutes);
  console.log(tArrival);
  console.log(moment().format("hh:mm A"));
  console.log(tArrival);
  console.log(moment().format("X"));

  $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>"
  + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
});
