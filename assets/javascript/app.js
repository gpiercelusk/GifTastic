//calls the renderButtons function to display initial topic array


var topics = ["Board Games", "Cooking", "Baking", "Arctic Monkyes", "The Beatles", "One Piece", "Dethklok", "Chocolate", "Schnauzers", "Vinyl", "Primus", "Ska"];


var APIkey = "bSjgDH5z6GZLhVQNHZLRlLNvnOhhG65r";
var gifCount = 10;


// Function for displaying topics data
function renderButtons() {
  //empties the button view div
  $("#buttons-view").empty();
  //loops through the array and creates a button for each topic
  for (var i = 0; i < topics.length; i++) {
    //sets "a" to generate a button
    var a = $("<button>");
    //adds a class of topic-btn to the button
    a.addClass("topic-btn btn btn-warning col-sm-12 col-md-12 col-lg-2");
    //adds attribute to the buttons
    a.attr("data-name", topics[i]);
    //adds text to the button
    a.text(topics[i]);
    //appends to buttons-view div
    $("#buttons-view").append(a);
  }
};

function displayGIFS() {
  var topicGIF = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    topicGIF + "&api_key=" + APIkey + "&limit=" + gifCount;
  //ajax call for button pressed
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      console.log(queryURL)
      console.log(response)
      var results = response.data;
      // loop the array of results
      for (var i = 0; i < results.length; i++) {
        // keeps this SFW
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          //creates new div for the gifs to go to 
          var gifDiv = $("<div>");
          gifDiv.addClass("thingsILike col-xs-12 col-sm-6 col-md-6 col-lg-3")
          //shows the gifs rating and creates a p tag for it
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          // creates a place for the gifimage to go
          var gifImageActive = $("<img>");
          var gifImageStill = $("<img>");
          gifImageStill.attr("src", results[i].images.fixed_width_still.url);
          gifImageStill.addClass("still");
          gifImageActive.attr("src", results[i].images.fixed_width.url);
          gifImageActive.addClass("active-gif hidden");


          gifDiv.prepend(gifImageStill);
          gifDiv.prepend(gifImageActive);
          $("#gifArea").prepend(gifDiv);
          gifDiv.append(p);
        }
      };
    });
};
var toggleGIFs = function () {
  $(this).children("img").toggleClass("hidden")
};

$(document).ready(function () {
  renderButtons();
});

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






$(document).on("click", ".topic-btn", displayGIFS)
$(document).on("click", ".thingsILike", toggleGIFs)








