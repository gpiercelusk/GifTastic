var topics = ["Alpacas", "Cooking", "Baking", "Arctic Monkyes", "The Beatles", "One Piece"];


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
    a.addClass("topic-btn");
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
  $("button").on("click", function () {
    var topicGIF = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      topicGIF + "&api_key=" + APIkey + "&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
          // if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          var gifDiv = $("<div>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var gifImage = $("<img>");
          gifImage.attr("src", results[i].images.fixed_height.url);
          gifDiv.append(p);
          gifDiv.append(gifImage);
          $("#gifArea").prepend(gifDiv);
          // }
        }
      });
  });
};

// $(document).on("click", ".topic-btn", )

//calls the renderButtons function to display initial topic array
renderButtons();



// // Adding a click event listener to all elements with a class of "movie-btn"
// $(document).on("click", ".movie-btn", displayMovieInfo);

