// API key and URLs

var api_key = "9c8e80a7";
var base_url = "http://www.omdbapi.com/?i=tt3896198&apikey=";
var movie_id = ""

function getMovieDetails(movie_id) {
    var url = `${base_url}${api_key}/${movie_id}`;

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            // Process and use response as needed
            console.log(response);
        },
        error: function(xhr, status, error) {
            console.error(`Error: ${xhr.status} - ${error}`);
        }
    });
}

getMovieDetails(movie_id);  // Replace with an actual IMDb movie ID
