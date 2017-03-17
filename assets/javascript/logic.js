
window.onload = function() {

  var config = {
    apiKey: "AIzaSyB29qRvG9SpHKMxK_HJMqKr0A7JC8JZ19c",
    authDomain: "traintime-f49ce.firebaseapp.com",
    databaseURL: "https://traintime-f49ce.firebaseio.com",
    storageBucket: "traintime-f49ce.appspot.com",
    messagingSenderId: "817355316729"
  };

firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var destination = "";
var start = "";
var frequency = "";

var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;

}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;

});

	database.ref().on("child_added", function(childSnapshot) {

		var childKey = childSnapshot.key;

		//firebase.database().ref().child('key/' + childKey)
        //.update({ title: "New title", body: "This is the new body" });

		var tFrequency = childSnapshot.val().frequency;
	    var firstTime = childSnapshot.val().start;

	    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

	    var currentTime = moment();

	    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

	    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	    console.log("DIFFERENCE IN TIME: " + diffTime);

	    var tRemainder = diffTime % tFrequency;
	    var tMinutesTillTrain = tFrequency - tRemainder;
	    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

		$("#trains").append("<tr><td id='name'>" + childSnapshot.val().name + "</td><td id='destination'>" + childSnapshot.val().destination + "</td><td id='date'>" + childSnapshot.val().start + "</td><td id='frequency'>" + childSnapshot.val().frequency + " min</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + " min away</td></tr>");

		console.log("TRAIN NAME: " + childSnapshot.val().name);
		console.log("TRAIN DESTINATION: " + childSnapshot.val().destination);
		console.log("TRAIN START TIME: " + childSnapshot.val().start);
		console.log("TRAIN FREQUENCY: " + childSnapshot.val().frequency);

	}, function(errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});

//	database.ref(childKey).on("child_change", function(childSnapshot) {

//		firebase.database().ref().parent('key/' + childKey)
//        .update({ name: "New title", destination: "This is the new body" });

//	});


$("#submit").on("click", function(event) {
	event.preventDefault();

	name = $("#name-input").val();
	destination = $("#destination-input").val();
	start = $("#start-input").val();
	frequency = $("#frequency-input").val();

	database.ref().push({
		name: name,
		destination: destination,
        start: start,
        frequency: frequency
	});
});

//$(".edit").on("click", function(event) {
//	event.preventDefault();

//	var editName = $("").val();
//	var editDestination = $("").val();
//	var editStart = $("").val();
//	var editFrequency = $("").val();

//	database.ref().set({
//		name: editName,
//		destination: editDestination,
//		start: editStart,
//		frequency: editFrequency
//	});
//});

}
