var topics = ["Alpacas", "Cooking", "Baking", "Arctic Monkyes", "The Beatles", "One Piece", "Dethklok", "Chocolate", "Schnauzer"];


var APIkey = "bSjgDH5z6GZLhVQNHZLRlLNvnOhhG65r";



// Function for displaying topics data
function renderButtons() {
  //empties the button view div
  $("#buttons-view").empty();
  //loops thought the array and creates a button for each topic
  for (var i = 0; i < topics.length; i++) {
    //sets "a" to generate a button
    var a = $("<button>");
    //adds a class of topic-btn to the button
    a.addClass("topic-btn btn btn-warning");
    //adds attribute to the buttons
    a.attr("data-name", topics[i]);
    //adds text to the button 
    a.text(topics[i]);
    //appends to buttons-view div
    $("#buttons-view").append(a);
  }
};

//function for adding new buttons from the user input
$("#add-gifs").on("click", function (event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  event.preventDefault();
  // grabs what is typed in the input field
  var topic = $("#topic-input").val().trim();
  //pushes new topic to the topics array
  topics.push(topic);
  // renders the button that was just added in the input field
  renderButtons();
  //clears input feild after render
  $("#topic-input").val("");
});

function displayGIFS() {
  var topicGIF = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    topicGIF + "&api_key=" + APIkey + "&limit=10";
  $("#gifArea").empty();
  //ajax call for button pressed
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      console.log(response)
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        // keeps this SFW
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          //creates new div for the gifs to go to 
          var gifDiv = $("<div>");
          //shows the gifs rating and creates a p tag for it
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          // creates a place for the gifimage to go
          var gifImageStill = $("<img>");
          gifImageStill.attr("src", results[i].images.original_still.url);
          gifDiv.append(p);
          gifDiv.append(gifImageStill);
          $("#gifArea").prepend(gifDiv);
        }
      }
    });
};
function clickToPlay() {
  var state = $(this).attr("src", results[i].images.original_still.url);
  console.log(state)
}
$(document).on("click", ".topic-btn", displayGIFS)


//calls the renderButtons function to display initial topic array
renderButtons();



// // Adding a click event listener to all elements with a class of "movie-btn"
// $(document).on("click", ".movie-btn", displayMovieInfo);

