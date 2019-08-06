// create an array of shows - in this case, awesome 90's tv shows
var shows = ["Portrait Painting", "Graffiti", "Figure Drawing", "History Painting", "Body Painting", "Skyscape Art", "Folk Art", "Native American Art", "Protest Art", "Religious Art", "Fancy Pictures", "Moving Panorama", "Digital Art", "Courtroom Sketch", "Child Art", "Surrealism"];

// creates buttons for each of these
function makeButtons() {
    // deletes the shows prior to adding new shows so there are no repeat buttons
    $('#buttonsView').empty();
    // loops through the shows array
    for (var i = 0; i < shows.length; i++) {
        // dynamically makes buttons for every show in the array
        var a = $('<button>')
        a.addClass('show'); // add a class
        a.attr('data-name', shows[i]); // add a data-attribute
        a.text(shows[i]); // make button text
        $('#buttonsView').append(a); // append the button to buttonsView div
    }
}

// handles addShow button event
$("#addShow").on("click", function () {

    // grabs the user show input
    var show = $("#show-input").val().trim();
    // that input is now added to the array
    shows.push(show);
    // the makeButtons function is called, which makes buttons for all my shows plus the user show
    makeButtons();
    // this line is so users can hit "enter" instead of clicking the submit button
    return false;
})

// function to display gifs
function displayGifs() {
    var artGenre = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + artGenre + "&limit=9&api_key=dc6zaTOxFJmzC";

    // creates ajax call
    $.ajax({ url: queryURL, method: "GET" }).done(function (response) {
        console.log(response.data);
        // save results as a variable
        var results = response.data;
        // for loop goes through each gif and adds these variables
        for (var i = 0; i < results.length; i++) {
            // creates a generic div to hold the results
            var gifDiv = $('<div class=gifs>');
            var showGif = $('<img>');
            showGif.attr('src', results[i].images.fixed_height_still.url);
            // shows the rating on hover
            showGif.attr('title', "Rating: " + results[i].rating);
            showGif.attr('data-still', results[i].images.fixed_height_still.url);
            showGif.attr('data-state', 'still');
            showGif.addClass('gif');
            showGif.attr('data-animate', results[i].images.fixed_height.url);
            // var rating = results[i].rating;
            // var p = $('<p>').text('Rating: ' + rating);
            gifDiv.append(showGif)
            // gifDiv.append(p)

            $("#gifsView").prepend(gifDiv);
        }

    });
}

// function for animating gifs
$(document).on('click', '.gif', function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    };
});



// function for displaying show gifs
$(document).on("click", ".show", displayGifs);

// initially calls the makeButtons function
makeButtons();