


            var topics = ["Obi-Wan Kenobi", "Luke Skywalker", "Han Solo", "Darth Vader", "Admiral Thrawn", "Emperor Palpatine", "Princess Leia Organa", "Chewbacca",
            "C-3PO", "R2-D2", "Lando Calrissian", "Boba Fett", "Stormtrooper", "Greedo", "Wilhuff Tarkin", "Wedge Antilles", "Jabba the Hutt", "Darth Revan", "Darth Malak", "Padme Amidala"];

        //    re-render html
        function displayGifInfo() {

            var topic = $(this).attr("data-name");

            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=PmllwCesRgqPW399ZHuVCIba3Fy8cCr6&limit=10";


            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                $("#gif-data").empty();
                var results = response.data
                
                
                console.log(results)
                for (var i = 0; i < results.length; i++){
                    
                var rating = response.data[i].rating;
                var image = $("<img src='" + results[i].images.fixed_height.url +"'/>");
                var imageStillUrl = response.data[i].images.fixed_height_still.url;
                var ratingText = $("<p id='rating'>" + "Rating: " + rating + "</p>");
                    
                    console.log(results[i].images.fixed_height.url)
                    
                    $("#gif-data").append(image)  
                    
                    $('#gif-data').prepend(image, ratingText)
                   
                    $()
                
                

                }

            });
        }






        // creates a new button when a new topic is entered as text and submitted,
    function renderButtons() {
            $("#buttons").empty();


            for (var i = 0; i < topics.length; i++) {

                var swButton = $("<button>" + topics[i] + "</button>");



                swButton.addClass("character");

                swButton.attr("data-name", topics[i]);

                swButton.text(topics[i]);

                $("#buttons").append(swButton);
            }
        }
        $("#add-gif").on("click", function (event) {
            event.preventDefault();
            
            var character = $("#form-input").val().trim();

            topics.push(character);

            renderButtons()

        })
        renderButtons()
        $(document).on("click", ".character", displayGifInfo)

